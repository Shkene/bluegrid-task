export const transformData = (tree, obj) => {
  const { ip, folder, subfolders, file } = obj;

  if (file === undefined) {
    return;
  }

  if (!tree[ip]) {
    tree[ip] = [];
  }

  let currentLevel = tree[ip];

  const foldersArray = [folder, ...subfolders].filter((part) => part !== "");
  foldersArray.forEach((part, index) => {
    let existingFolder = currentLevel.find(
      (item) => typeof item === "object" && item.hasOwnProperty(part)
    );
    if (!existingFolder) {
      if (index === foldersArray.length - 1) {
        currentLevel.push({ [part]: [file] });
      } else {
        existingFolder = { [part]: [] };
        currentLevel.push(existingFolder);
      }
    }
    currentLevel = existingFolder
      ? existingFolder[part]
      : currentLevel.find((item) => item[part])[part];
  });

  if (Array.isArray(currentLevel) && !currentLevel.includes(file)) {
    currentLevel.push(file);
  }
};
