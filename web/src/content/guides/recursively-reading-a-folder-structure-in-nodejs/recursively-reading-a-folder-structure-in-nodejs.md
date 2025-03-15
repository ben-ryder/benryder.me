---
# Basic data
slug: 'recursively-reading-a-folder-structure-in-nodejs'
title: 'Recursively reading a folder structure in Node.js'
description: 'An explanation and code example of how you can recursively read a folders structure with Node.js.'
isFeatured: false
isPublished: true
tags:
  - quick-tips
# Timestamps
createdAt: 2021-02-16T00:00:00.000Z
updatedAt: 2021-05-23T00:00:00.000Z
# Related content
relatedBlogPosts: []
relatedProjects: []
---

While developing an Electron based markdown editor - similar to [Mark Text](https://marktext.app/) and [Zettlr](https://www.zettlr.com/) - to practice using Electron, I came across the need to read the folder structure of a supplied folder to display the files in a sidebar to the user.

I had a search around, however all examples I could find to recursively load in the folder structure (all files in the supplied folder and all sub folders) were returning a flat list of file paths, which for my use case was loosing valuable data about the folder structure.

The best solution I found for loading files recursively was from [coderrocketfuel.com](https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js):

```js
const fs = require("fs")
const path = require("path")

const getAllFiles = function(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
        } else {
            arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
        }
    })

    return arrayOfFiles
}
```

Their solution ends up returning an array of files. While this is good, for my use case I wanted to retain the folder structure data so I can use it later in the sidebar for functionality such as expand and collapse folders.

I decided to use the following data structure to represent a folder:

```js
let folder = {
    name: "folder",
    path: "/path/to/folder",
    files: [], // A list of file objects (see below)
    children: [], // A list folders objects sharing the same structure.
}

let file = {
    name: "filename",
    path: "path/to/the/filename"
}
```

Just a note, I know that the "name" field on the folder and file object is technically already stored in the path, but I felt it made more sense to process it here once rather than having to work it out on the fly when needed.

I then just had to replace the `arrayOfFiles` in the above example with my new folder data structure. A few edits - and some extra edits specifically for my project such as the allowed file extensions check - got me the following:

```js

const fs = require("fs")
const path = require("path")

const allowedFileExtensions = [".md"]

function loadDirectoryStructure(directoryPath, parentFolder) {
	let files = fs.readdirSync(directoryPath)
	parentFolder = parentFolder || {
		name: path.basename(directoryPath),
		path: directoryPath,
		files: [],
		children: [],
	}
	
	files.forEach(file => {
		let filePath = directoryPath + path.sep + file
		if (fs.statSync(filePath).isDirectory()) {
			parentFolder.children.push(this.loadDirectoryStructure(filePath))
		}
		else if (allowedFileExtensions.includes(path.extname(filePath))) {
			parentFolder.files.push({
				name: path.basename(filePath),
				path: filePath
			})
		}
	})
	
	return parentFolder
}
```

This function can now take a folder path, and will output a folder object that retains the folder structure while you are still able to access all the file and folder paths

I'm not saying that this is the best or only way to achieve this, but it's what I decided to use and it's working for me so far!
