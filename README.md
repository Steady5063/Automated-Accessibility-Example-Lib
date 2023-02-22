# Automated-Accessibility-Example-Lib
<p align="center">
<img src="https://cdn-icons-png.flaticon.com/512/1512/1512642.pnghttps://t4.ftcdn.net/jpg/03/09/54/77/360_F_309547763_hfMHTCBPN5pp1PGZS0uveXdZM7vXD6tl.jpg" height="70px" width="100px" alt="" />
</p>

This repo houses a library of accessibility automation examples that use multiple different testing frameworks.

## Purpose

To help developers build a better automated accessibiltiy testing process. Too many times teams stop at simply adding a singular test 
case to their UI tests. We want to build a better more robust set of automated accessibiltiy tests, and this library can help you build those out. 

## Structure

The examples are currently categorized by different levels of test. 

```

    ├── Integration             # Testing library example that test at an integration level
    │   ├── Cypress             # Load and stress tests
    │   ├── PlayWright          # End-to-end, integration tests (alternatively `e2e`)
    │   └── Puppeteer           # Unit tests
    └── Component
    |   ├── React Testing Lib      # Load and stress tests
    |   ├── Vue Test Utils         # End-to-end, integration tests (alternatively `e2e`)
    |   └── Angular Karma          # Unit tests

```