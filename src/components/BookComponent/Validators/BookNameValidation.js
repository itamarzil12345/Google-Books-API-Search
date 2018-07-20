export function validateBookName(name) {
  if (typeof name !== "string") {
    console.log("attempting to validate a non string entity");
    return titleCaseName;
  }
  var removeNonEnglishLetters = name.replace(/[^a-zA-Z ]/g, "");
  var titleCaseName = titleCase(removeNonEnglishLetters);
  return titleCaseName;
}

function titleCase(str) {
  str = str.toLowerCase();
  str = str.split(" ");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
}
