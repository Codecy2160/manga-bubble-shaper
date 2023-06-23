# Manga Bubble Shaper

![](https://github.com/Codecy2160/manga-bubble-shaper/blob/master/header.gif)

The Manga Bubble Shaper is a script designed to aid the comic lettering process in Adobe Photoshop and Indesign. Its main goal is to set a baseline bubble shape to text by adding line breaks (`\n`) to the current selected text layer in Photoshop and Indesign. The script should not be treated as a be-all end-all solution for text shaping but rather as a guide.

Please note that the script also adds extra whitespace to lines that end or start with an ellipsis.

## Usage

### Photoshop
1. Open Adobe Photoshop.
2. Select the text layers you want to shape.
3. Run the Manga Bubble Shaper script via ```File > Scripts```.
4. The script will automatically add line breaks to the selected text layer, shaping it into a baseline bubble shape.

### Indesign
1. Open Adobe Indesign.
2. Place ```manga-bubble-shaper_id_1_20.jsx``` in the scripts directory (this is usually at ```%appdata%\Adobe\InDesign\Version X.XX\#locale#\Scripts\Scripts Panel\```).
3. Select the text frames you want to run the script on.
4. Run the script via the Scripts Panel (Ctrl + Alt + F11).

## Known Errors

### New Contents Out of Bounds Pop-Up
- This may sometimes happen when using paragraph text but can be completely ignored.

## Limitations

- The script is not a comprehensive solution for text shaping and may require manual adjustments.
- It may not handle all text scenarios perfectly and may not produce desired results in certain cases.
- Users should use the script as a guide and make further adjustments as needed.

## Contributing

Contributions to the Manga Bubble Shaper are welcome! If you have any ideas, suggestions, or improvements, please feel free to contribute. You can fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the script in accordance with the terms of the license.

## Changlog

### 1.00
- Initial release.

### 1.10 
- Can now process multiple selected layers.

### 1.20
- Fixed variable scope issues.
- Will no longer leave stranded single short words on their own line.
- Added rulesets for text that are only two or three words long.