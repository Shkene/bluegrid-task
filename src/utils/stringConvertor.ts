export const stringConvertor = (string: string) => {
  const ipSplitFrom = string.split("//")[1];
  const ipSplitTo = ipSplitFrom.split(":")[0];
  const ip = ipSplitTo.trim();

  const folder = string.split("//")[1].split("/")[1];
  const subfoldersString = string.split("//")[1].split("/");
  let subfolders: string[] = [];
  let file;
  for (let index = 2; index < subfoldersString.length; index++) {
    const element = subfoldersString[index];
    if (checkIsSubfolderOrFile(element)) {
      subfolders.push(element);
    } else {
      file = element;
    }
  }

  let object: responseType = {
    ip,
    folder,
    subfolders: subfolders,
    file,
  };
  return object;
};

interface responseType {
  ip: string;
  folder: string;
  subfolders?: string[];
  file?: string;
}

const checkIsSubfolderOrFile = (string: string) => {
  return !string.includes(".");
};
