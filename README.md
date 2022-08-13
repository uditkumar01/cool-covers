<div align="center">
 <img width="100px" src="https://user-images.githubusercontent.com/55291327/143779291-adc7c78a-e643-4bf5-962d-35ce2a7b7a91.png" align="center" alt="GitHub Readme Covers" />
 <h2 align="center">❄️ GITHUB COOL COVERS ❄️</h2>
 <p align="center">Get dynamically generated 🌐 GitHub covers for your readmes!</p>
</div>

<div align="center">
 <img src="https://img.shields.io/badge/react%20-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="react basge" />
 <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="ts basge" />
 <img src="https://img.shields.io/badge/Next-002E3B?style=for-the-badge&logo=nextdotjs&logoColor=#00DC82" alt="nextjs badge" />
 <br />
 <img src="https://img.shields.io/github/repo-size/uditkumar01/cool-covers?style=for-the-badge&color=blueviolet" alt="repo size badge" />
 <img src="https://img.shields.io/github/stars/uditkumar01/cool-covers?style=for-the-badge&color=silver" alt="build status badge" />
 <img src="https://img.shields.io/github/forks/uditkumar01/cool-covers?style=for-the-badge" alt="no of forks badge" />
 </div>


# ⭐ Features

- Dynamically 🤖 generated covers with cool patterns.
- Updates the recent followers ✏️ avatars on every follow event, instantly.
- Eight unique 😊 background patterns.
- Supports all 🕸️ [Web Safe Fonts](https://www.w3schools.com/cssref/css_websafe_fonts.asp) + 🤩 [Google Fonts](https://fonts.google.com/).
- Highly Customizable 📝.

# 📌 How 2️⃣ Use?

Copy-paste this into your markdown content, and that's it. Simple!

Change the `username=` value to your GitHub's username.

Change the `text=` value to update cover's title.

```md
[![Udit's GitHub cover](https://github-cool-covers.vercel.app/api/get-cover?username=uditkumar01&text=Hola,+I'm+Udit)](https://github.com/uditkumar01/cool-covers)
```

### 🔤 Change Font

To change the font, you can pass a query parameter `?fontFamily=` with the font name.

> Example: `&fontFamily=Roboto`

```md
![Udit's GitHub cover](https://github-cool-covers.vercel.app/api/get-cover?username=uditkumar01&text=Hola,+I'm+Udit&fontFamily=Roboto)
```

<em>Note: The font name must be a valid font name (**case sensitive**). For Google fonts u can directly copy the name of the font from here: <a href="https://fonts.google.com/">Google Fonts</a></em>

### 🐤 Change Font Size

You can change the font size by passing a query parameter `?fontSize=` with the font size.

> Example: `&fontSize=4rem`

```md
![Udit's GitHub cover](https://github-cool-covers.vercel.app/api/get-cover?username=uditkumar01&text=Hola,+I'm+Udit&fontSize=4rem)
```

<em>Note: The font size can be any number or string.</em>

### ⚒️ Change Font Weight

To change the font weight, you can pass a query parameter `?fontWeight=` with the font weight.

> Example: `&fontWeight=400`

```md
![Udit's GitHub cover](https://github-cool-covers.vercel.app/api/get-cover?username=uditkumar01&text=Hola,+I'm+Udit&fontWeight=400)
```

<em>Note: The font weight can be `light/regular/bold/bolder/lighter` or any number.</em>

### 🎨 Change Background Color

With the help of the `?bgColor=` query parameter, you can change the background color of the cover.

Use `?bgColor=` with the **hex code without #** of the color you want to use.

> Example: `&bgColor=000000`

```md
![Udit's GitHub cover](https://github-cool-covers.vercel.app/api/get-cover?username=uditkumar01&text=Hola,+I'm+Udit&bgColor=000000)
```

### :four_leaf_clover: Change Text Color

Using `?textColor=` query parameter, you can change the text color of the cover.

Use `?textColor=` with the **hex code without #** of the color you want to use.

> Example: `&textColor=ffffff`

```md
![Udit's GitHub cover](https://github-cool-covers.vercel.app/api/get-cover?username=uditkumar01&text=Hola,+I'm+Udit&textColor=ffffff)
```

### 💎 Add Background Pattern

To add a background pattern, you can pass a query parameter `?pattern=` with the pattern name.

> Example: `&pattern=p2`

```md
![Udit's GitHub cover](https://github-cool-covers.vercel.app/api/get-cover?username=uditkumar01&text=Hola,+I'm+Udit&pattern=p2)
```

If you wish **you can 💻 contribute by creating a new pattern and designs.**

<em>Note: Currently, eight patterns are available. `p1` to `p8`.</em>

### 🔥 Add Grayscale Effect

Using `?grayscale=` query parameter, you can add a grayscale effect to the cover's background pattern.

✅ Empty query parameter will remove the grayscale effect.

✅ Non-empty the query parameter to add the grayscale effect.

> Example: `&grayscale=true` // Adds the grayscale effect.

> Example: `&grayscale=''` // Removes the grayscale effect.

```md
![Udit's GitHub cover](https://github-cool-covers.vercel.app/api/get-cover?username=uditkumar01&text=Hola,+I'm+Udit&pattern=p2&grayscale=true)
```

### :large_blue_circle: Change Avatar Radius

You can easily change the avatar radius of recent followers by passing a query parameter `?avatarRadius=` with the radius value.

Its value should be a number.

> Example: `&avatarRadius=50`

```md
![Udit's GitHub cover](https://github-cool-covers.vercel.app/api/get-cover?username=uditkumar01&text=Hola,+I'm+Udit&pattern=p2&grayscale=true&avatarRadius=50)
```

### 🖼️ All Different Patterns

<!-- get table of able images 2 cols -->

<table>
    <tr>
        <td>
            <img src="https://github-cool-covers.vercel.app/api/get-cover?username=sauravtom&text=Hi,+I'm+Saurav&pattern=p1&fontSize=6rem" alt="GitHub Readme cover" />
        </td>
        <td>
            <img src="https://github-cool-covers.vercel.app/api/get-cover?username=uditkumar01&text=Hola,+I'm+Udit&pattern=p2&fontFamily=Rubik+Maze" alt="GitHub Readme cover" />
        </td>
    </tr>
    <tr>
        <td>
            <img src="https://github-cool-covers.vercel.app/api/get-cover?username=sohamsshah&text=Hello,+I%27m+Soham&pattern=p3&fontSize=6rem&fontFamily=Luckiest+Guy" alt="GitHub Readme cover" />
        </td>
        <td>
            <img src="https://github-cool-covers.vercel.app/api/get-cover?username=SAYUK09&text=Hola,+I'm+Sayuri&pattern=p4&fontFamily=Bangers" alt="GitHub Readme cover" />
        </td>
    </tr>
    <tr>
        <td>
            <img src="https://github-cool-covers.vercel.app/api/get-cover?username=MehulKChaudhari&text=Hola,+I'm+Mehul&pattern=p5&fontFamily=Rock+Salt&fontSize=5rem" alt="GitHub Readme cover" />
        </td>
        <td>
            <img src="https://github-cool-covers.vercel.app/api/get-cover?username=vivekgugnani&text=Hola,+I'm+Vivek&pattern=p6&fontFamily=Audiowide" alt="GitHub Readme cover" />
        </td>
    </tr>
    <tr>
        <td>
            <img src="https://github-cool-covers.vercel.app/api/get-cover?username=NadaaFarook&text=Hola,+I'm+Nada&pattern=p7&fontFamily=Silkscreen" alt="GitHub Readme cover" />
        </td>
        <td>
            <img src="https://github-cool-covers.vercel.app/api/get-cover?username=prerana1821&text=Hello,+I'm+Prerana&pattern=p8&fontFamily=Rubik+Distressed " alt="GitHub Readme cover" />
        </td>
    </tr>
</table>

<h3 align="center">⭐ Star this project on GitHub</h3>

<p align="center">Made with ❣️ and JavaScript.</p>

<br />

<p align="center"><a href="https://www.buymeacoffee.com/uditkumar01" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a></p>
