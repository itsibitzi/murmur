import fs from "fs";
import _ from "lodash";

const icons = fs.readdirSync("./icons");

icons.forEach((icon) => {
  const iconName =
    _.startCase(icon.split(".")[0].replace("icon-", "")).replace(" ", "") +
    "Icon";
  const iconBody = fs
    .readFileSync(`./icons/${icon}`, "utf8")
    .replace(
      'viewBox="0 0 24 24"',
      'viewBox="0 0 24 24" width="24" height="24"'
    );

  const template = `
export const ${iconName} = () => (
    ${iconBody}
)
`;

  fs.writeFileSync(`./src/components/icons/${iconName}.tsx`, template, "utf8");
});
