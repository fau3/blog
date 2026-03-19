---
title: "Example 1: Basic Markdown Syntax"
description: "This article is used to test and list a variety of Markdown elements"
publishDate: "1998-07-30"
tags: ["Example"]
ogImage: "/social-card.avif"
---

<!-- hash: manual_translation -->

> This article is translated from the Chinese original.

## This is an H2 heading

### This is an H3 heading

#### This is an H4 heading

##### This is an H5 heading

###### This is an H6 heading

## Horizontal rules

***

---

___

## Emphasis

**This is bold text**

_This is italic text_

~~Strikethrough~~

## Quotes

"Double quotes" and 'single quotes'

## Blockquotes

> Blockquotes can also be nested...
>
> > ...by using additional greater-than signs next to each blockquote marker...

## Footnotes

An example containing a clickable footnote[^1] linked to its source.

A second example containing a footnote[^2] linked to its source.

[^1]: The first footnote reference, with a link back to the content.

[^2]: The second reference, with a link.

If you look at this example in `src/content/post/markdown-elements/index.md`, you will see that the footnotes and the "Footnotes" heading are appended to the bottom of the page through the [remark-rehype](https://github.com/remarkjs/remark-rehype#options) plugin.

## Lists

Unordered list

- Create a list by using `+`, `-`, or `*` at the start of a line
- Nested lists are created by indenting two spaces:
  - Changing the marker character forces a new list to start:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
- Very easy!

Ordered list

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

4. You can use sequential numbers...
5. ...or set them all to `1.`

Starting from an offset:

57. foo
1. bar

## Code

Inline `code`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code

Fenced code block

```
Sample text here...
```

Syntax highlighting

```js
var foo = function (bar) {
	return bar++;
};

console.log(foo(5));
```

### Expressive Code examples

Add a title

```js title="file.js"
console.log("Title example");
```

Bash terminal

```bash
echo "A base terminal example"
```

Highlight code lines

```js title="line-markers.js" del={2} ins={3-4} {6}
function demo() {
	console.log("this line is marked as deleted");
	// This line and the next one are marked as inserted
	console.log("this is the second inserted line");

	return "this line uses the neutral default marker type";
}
```

[Expressive Code](https://expressive-code.com/) can do far more than what is shown here, and it includes many [custom options](https://expressive-code.com/reference/configuration/).

## Tables

| Option | Description                                                               |
| ------ | ------------------------------------------------------------------------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default.    |
| ext    | extension to be used for dest files.                                      |

### Table alignment

| Item         | Price | # In stock |
| ------------ | :---: | ---------: |
| Juicy Apples | 1.99  |        739 |
| Bananas      | 1.89  |          6 |

### Keyboard elements

| Action                | Shortcut                                   |
| --------------------- | ------------------------------------------ |
| Vertical split        | <kbd>Alt+Shift++</kbd>                     |
| Horizontal split      | <kbd>Alt+Shift+-</kbd>                     |
| Auto split            | <kbd>Alt+Shift+d</kbd>                     |
| Switch between splits | <kbd>Alt</kbd> + arrow keys                |
| Resizing a split      | <kbd>Alt+Shift</kbd> + arrow keys          |
| Close a split         | <kbd>Ctrl+Shift+W</kbd>                    |
| Maximize a pane       | <kbd>Ctrl+Shift+P</kbd> + Toggle pane zoom |

## Images

Image in the same folder: `src/content/post/demo/markdown-elements/logo.png`

![Astro theme cactus logo](./logo.png)

## Links

[Content from Markdown-it](https://markdown-it.github.io/)
