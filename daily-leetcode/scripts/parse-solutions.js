const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

async function main() {
    const files = await getSolutionFiles('../');
    const solutions = [];

    for (const filePath of files) {
        try {
            const fileContent = await fs.readFile(filePath, 'utf8');
            const solutionFile = parseSolutionFile(filePath, fileContent);
            solutions.push(solutionFile);
        } catch (error) {
            console.error(`Error parsing file ${filePath}: ${error.message}`);
        }
    }
    const solutionsJSON = generateSolutionsJSON(solutions);
    await writeOutputFile(solutionsJSON, path.join('../public', 'solutions.json'));
}

// Read all solution files from the solutions directory
async function getSolutionFiles(solutionsDir) {
    const solutionsPath = path.join(solutionsDir, 'solutions');
    try {
        const files = await fs.readdir(solutionsPath);
        const codeFiles = files.filter(file => 
            file.endsWith('.js') ||
            file.endsWith('.java') ||
            file.endsWith('.py') ||
            file.endsWith('.cpp')
        );
        return codeFiles.map(file => path.join(solutionsPath, file));
    } catch (error) {
        throw new Error(`Failed to read solution files: ${error.message}`);
    }
}

// Parse a single solution file to extract metadata and code
function parseSolutionFile(filePath, fileContent) {
    const metadata = extractMetadata(fileContent);
    const solutionCode = extractSolutionCode(fileContent);

    if (!metadata || !solutionCode) {
        throw new Error(`Failed to parse solution file: ${filePath}`);
    }

    const filename = path.basename(filePath);
    const id = generateHashFromFilename(filename);

    const solutionFile = {
        id: id,
        title: metadata.title,
        difficulty: metadata.difficulty,
        tags: metadata.tags,
        date: metadata.date,
        description: metadata.description,
        problemUrl: metadata.problemUrl,
        solution: solutionCode,
        filename: filename
    }
    return solutionFile;
}

// Extract metadata from comment block at top of file
function extractMetadata(fileContent) {
    const regex = /"""\s*([\s\S]*?)\s*"""/;
    const match = fileContent.match(regex);

    if (!match) {
        return null;
    }

    const metadataText = match[1].trim();

    const metadata = {};
    const lines = metadataText.split('\n');

    lines.forEach(line => {
        if (!line.trim()) return; 

        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) return;
        
        const key = line.substring(0, colonIndex).trim().toLowerCase();
        const value = line.substring(colonIndex + 1).trim();

        if (key === 'title') {
            metadata.title = value;
        } else if (key === 'difficulty') {
            metadata.difficulty = value;
        } else if (key === 'tags') {
            metadata.tags = value.split(',').map(tag => tag.trim());
        } else if (key === 'date') {
            metadata.date = value;
        } else if (key === 'description') {
            metadata.description = value;
        } else if (key === 'problemurl') {
            metadata.problemUrl = value;
        }    
    });
    return metadata;
}

// Clean and format the solution code (remove metadata comments)
function extractSolutionCode(fileContent) {
    const regex = /"""\s*([\s\S]*?)\s*"""/;
    const match = fileContent.match(regex);

    if (!match) {
        return null;
    }
    return fileContent.replace(match[0], '').trim();
}

// Generate the final JSON structure
function generateSolutionsJSON(solutions) {
    const now = new Date().toISOString();

    const result = {
        solutions: solutions,
        totalSolutions: solutions.length,
        lastUpdated: now,
    }
    return result;
}

// Write JSON to output file
async function writeOutputFile(jsonData, outputPath) {
    try {
        const jsonString = JSON.stringify(jsonData, null, 2);
        await fs.writeFile(outputPath, jsonString, 'utf8');
        console.log(`Output written to ${outputPath}`);
    } catch (error) {
        throw new Error(`Failed to write output file: ${error.message}`);
    }
}

// Utility: Generate a unique hash from the filename to use as ID
function generateHashFromFilename(filename) {
  const hash = crypto.createHash('sha256');
  hash.update(filename);
  return hash.digest('hex');
}

// Run the script
if (require.main === module) {
    main().catch(error => {
        console.error(`Error in main function: ${error.message}`);
        process.exit(1);
    });
}

module.exports = {
    main,
    parseSolutionFile,
    extractMetadata,
};