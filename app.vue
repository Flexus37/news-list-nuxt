<template>
  <NuxtLayout>
    <NuxtPage page-key='static' />
  </NuxtLayout>
</template>


<style lang='scss'>
  :root {
    --max-width: 1100px;
    --border-radius: 12px;
    --font-mono: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono",
      "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro",
      "Fira Mono", "Droid Sans Mono", "Courier New", monospace;
    --font-sans: Arial, sans-serif;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    font-family: Arial, Helvetica, sans-serif;
    max-width: 100vw;
    overflow-x: hidden;
    font-size: 62.5%; // 1rem = 10px
  }

  body {
    color: #000;
    background: #FBFBFB;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h2 {
    font-size: 1.8rem;
    font-weight: bold;
    color: $color-blue;
    line-height: 2.2rem;
  }

  p {
    font-size: 1.4rem;
    font-weight: normal;
    color: $color-text;
    line-height: 2rem;
  }

  a {
    font-size: 1.4rem;
    font-weight: normal;
    line-height: 2rem;
    color: $color-blue;
    text-decoration: underline;
  }

  button, input {
    border: none;
    background-color: $color-bg;
  }

  .message {
    h2 {
      font-size: 3rem;
      margin-bottom: 2rem;
      line-height: 1
    }
  }

  .error {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;

    &__refreshBtn {
      margin: 1.5rem 0;
      padding: 1rem 1.2rem;

      font-size: 1.4rem;
      font-weight: bold;
      color: $color-blue;
      cursor: pointer;
      border: none;
      border-radius: .3rem;
      background-color: $color-white;
      box-shadow: $shadow-1, $shadow-2;

      transition: color .1s ease-in-out, background-color .1s ease-in-out;

      &:hover {
        background-color: $color-blue;
        color: $color-white;
      }
    }
  }
</style>