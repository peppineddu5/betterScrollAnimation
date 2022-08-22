# betterScrollAnimation-lite

<p align="center">
<img src="https://user-images.githubusercontent.com/59139796/185054324-83f07df2-a49d-476c-acd3-0cdd9ee6d9b1.png" style="width:15%;border-radius: 25px;">
</p>


### Lenguage
- [Italiano](https://github.com/peppineddu5/betterScrollAnimation-lite/edit/master/lenguage/READMEIT.md)
- [English](https://github.com/peppineddu5/betterScrollAnimation-lite/)

## What is ScrollAnimation-lite best for?
For the moment this library only serves to add a class the item is displayed.
And waiting for a more effective system to create javascript animations, I made a simple css file with some animations already made and if you want to know more go [here](#anim)
Obviously there are parameters that allow you to choose what should be displayed to activate the class, the screen for when it exits.
Also more then choose whether once the class has started it does not take off or something else (for more information read this section).
A not insignificant advantage over this library is that it weighs less than 3kb.

## let's begin
To use the library you need to download the `betterScrollAnimation.min.js` file and place it on a directory of your choice and import it just before the end of the body, then under that script you put another one and create the 'instance of the `betterScrollAnimation` class
```html
<!DOCTYPE html>
<html lang="it">
<head>
</head>
<body>
 <!--Tutto il codice html-->
<script src="PATH del file" ></script>
  <script>
    new betterScrollAnimation()
  </script>
</body>
</html>
```
At the `betterScrollAnimation` constructor you can pass it an object with all parameters which are optional, here they are (see them in detail later).
| Name      | Type |Default     |Description
| :----:        |    :----:   |          :----: |         :----: |
| name      | `string  `     | "bescan"   |the name with which to call the attribute to be searched for in the js file |
| prefix   | `string`        | "bsa-"      |the prefix of the attribute|
| rootMargin   | `string`        | "0px 0px 0px 0px"      |The leading edge for the animation. This can be negative or positive and is expressed in pixels, plus you can set the margin in any direction |
| threshold   | `number`        | 0.5      |This value tells you when to give the class to the DOM element you want. 0.5 = as soon as the element is displayed in the middle of the class, or if you put 1.0 it means that it will give the set class as soon as the element will be seen at 100%, obviously this is all also relative to the margin you put|
| elToScroll   | `Window` | HTMLElement       |the element that will control the scroll   |The element to which it will see if on scroll exits the user's view to remove the class|
| defaultClass |`string`| "active"      |It is used to insert a default class if it is not specified|
| errorYD |`number`| 0      |Y-axis error for when it falls further down than the element|
| errorYU |`number`| 0      |Y-axis error for when it rises higher than the element|
| errorXD |`number`| 0      |X axis error for when it goes furthest to the right of the element|
| errorXU |`number`| 0      |X axis error for when it goes furthest to the left of the element|


## How to make the library work?
After creating the instance of the betterScrollAnimation class you have to pay attention to the name and prefix you have chosen, in fact if you have entered a custom one you will have to follow the one you set otherwise the default for the name is bescan while the prefix is bsa-. <br>
Look at this example
html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
    <div class="box" bescan>Only bescan</div>
    <div class="box" bescan bsa-tranClass="fade-up" bsa-OU>bsa-OU</div>
    <div class="box" bescan bsa-tranClass="fade-up" bsa-SA>bsa-SA</div>
    <div class="box" bescan bsa-tranClass="fade-up">bsa-tranClass="fade-up"</div>
    <script src="./betterScrollAnimation.min.js"></script>
    <script>
        new betterScrollAnimation()
    </script>
</body>
</html>
```
css:
```css
body {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.box {
    width: 200px;
    height: 200px;
    background-color: red;
    margin-top: 50vh;
    color: white;
    display: grid;
    place-items: center;
}

[bescan] {
    transition: 0.5s;
}

.active {
    background-color: blue;
}

[bsa-tranClass="fade-up"] {
    transform: translateX(20px);
    opacity: 0%;
}

.fade-up {
    transform: translateX(0);
    opacity: 100%;
    background-color: blue;
}
```
To tell the library to listen to an html element, just add bescan to it and if you do, you don't have to put any parameters or custom. <br>
Automatically the library adds the `active` class to the scroll but if we want a custom one we just need to put the` prefix + tranClass` and it will no longer put `active` but the selected one. <br>
Finally the last two attributes. <br>
The first one that is composed with the `prefix + SA` will add the class of your choice / the default one and will not remove it anymore so it stops listening to that element. <br>
Finally there is the `prefix + OU` which will remove the class only when the user climbs higher than the element. <br>

Now let's see all the attributes that can be entered
| Name of the attribute     | Type |Default     |Description
| :----:        |    :----:   |          :----: |         :----: |
| bescan \|\| option.name      | `string`     | "custom"   |This attribute is for now only to tell the library to listen to this HTMLElement|
| bsa-OU \|\| option.prefix + OU     | any     | nothing   |This attribute is used to remove the class only when it goes higher and not when it goes lower|
| bsa-SA \|\| option.prefix + SA     | any     | nothing   |This attribute will add the class and will not remove it anymore|
| bsa-delay \|\| option.prefix + delay     | number     | 0   |This attribute adds a delay before adding the class|

## How does this library work?
The version of this library only allows you to add / remove a class on page scrolling. <br>
To use this library 100% you need to know how it works. <br>
In fact, to be the most efficient possible, it uses two eventListener and an `Intersection Observer` which are supported by all browsers except Explorer.
The event listener for the scroll will make its calculations only when there are elements on the screen that are just waiting to exit the viewport to no longer be calculated and therefore optimize the library. <br>
The second instead is for the resize of the page which is used to update the values of the width / height of the viewport that the previous listener will use. <br>
Finally there is the `intersectionObserver` which is used for when the element enters the user's viewport and mainly serves to use as little as possible the scroll eventListener which otherwise risks becoming JavaScript heavy. <br>
To better understand this library it is recommended to go to see the documentation on [intersectionObserver] (https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) and immediately afterwards you can go on with this documentation to resolve doubts. <br>
### Why is ONLY intersectionObserver used?
Unfortunately, if the class you use moves or resizes the object, this can go in a loop because at the beginning it sees the object well but then it disappears and then removes the class, later it puts it back but returning to the initial position this re-unleashes event and consequently the loop.
Precisely so that this does not happen, I use the getBoundingClientRect () to see their position then when they come out I stop calculating them in such a way that it is as performing as possible.

## <p id="anim">How to use pre-made animations </p>
in addition to installing `betterScrollAnimation.min.js` we need to download the` betterScrollAnimationCSS.min.css` file and import it.
Now we are ready to use the animations already present but this is only temporary, in fact I suggest you create them yourself as it can create scroll problems since it does not use the `position: relative` property but uses the transform.
Also remember that we are developing a more efficient system for scroll animations.
small example
```html
<! DOCTYPE html>
<html lang = "en">
<head>
 <link rel = "stylesheet" href = "betterScrollAnimationCSS.min.css">
</head>
<body>
     <div class = "box" bescan bsa-tranClass = "fade-up"> fade-up </div>
    <script src = "./ betterScrollAnimation.min.js"> </script>
    <script>
        new betterScrollAnimation ()
    </script>
    <style>
    .box {
    width: 200px;
    height: 200px;
    margin-left: calc (50vw - 100px);
    margin-top: 40vh;
    color: white;
    display: grid;
    place-items: center;
    padding: 0;
    font-size: 30px;
}
    </style>
</body>
</html>
```
if you want to see more examples you can visit the [site](https://peppineddu5.github.io/base-css-scrollAnimation/) or read the [source code](https://github.com/peppineddu5/betterScrollAnimation/tree/master/examples/simpleAnimation)
