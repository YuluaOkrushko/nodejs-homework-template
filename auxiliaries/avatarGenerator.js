const AvatarGenerator = require("avatar-generator");
const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

exports.generateAvatar = async () => {
  const avatar = new AvatarGenerator({
    parts: ["background", "face", "head", "hair", "eye", "mouth"],
    partsLocation: path.join(__dirname, "../node_modules/avatar-generator/img"),
    imageExtension: ".png",
  });

  const variant = "female";
  const name = `${Date.now()}.png`;
  const image = await avatar.generate(name, variant);

  await image.png().toFile(path.join(__dirname, `../tmp/${name}`));

  await fsPromises.copyFile(
    path.join(__dirname, `../tmp/${name}`),
    path.join(__dirname, `../public/images/${name}`)
  );

  await fsPromises.unlink(path.join(__dirname, `../tmp/${name}`));

  return `http://localhost:${PORT}/images/${name}`;
};
