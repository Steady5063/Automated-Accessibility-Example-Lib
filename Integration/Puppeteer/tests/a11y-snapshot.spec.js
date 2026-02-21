const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const TARGET_URL = 'https://www.normalil.gov/';

describe('normalil.gov accessibility snapshot', () => {
  let browser;
  let page;
  let allNodes;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: 'new' });
    page = await browser.newPage();
    await page.goto(TARGET_URL, { waitUntil: 'networkidle2' });

    // Take an accessibility snapshot of the page.
    // This returns the full accessibility tree as a nested object.
    const snapshot = await page.accessibility.snapshot({ interestingOnly: false });

    // Flatten the nested tree into a simple array so we can use
    // standard array methods like .filter() in our tests.
    allNodes = flattenTree(snapshot);
    printTreeToFile(snapshot);
  });

  afterAll(async () => {
    await browser.close();
  });

  // Walks the nested AX tree and returns every node as a flat array.
  function flattenTree(node) {
    if (!node) return [];
    const children = (node.children ?? []).flatMap(flattenTree);
    return [node, ...children];
  }

  // Writes the accessibility tree to a log file.
  function printTreeToFile(node) {
    const lines = [];

    function walk(node, indent = 0) {
      const prefix = '  '.repeat(indent);
      const name = node.name ? ` — "${node.name}"` : '';
      lines.push(`${prefix}[${node.role}]${name}`);
      for (const child of node.children ?? []) {
        walk(child, indent + 1);
      }
    }

    walk(node);

    const logPath = path.join(__dirname, 'accessibility-tree.log');
    fs.writeFileSync(logPath, lines.join('\n'), 'utf8');
    console.log(`Accessibility tree written to ${logPath}`);
  }

  test('page has at least one heading', () => {
    const headings = allNodes.filter((node) => node.role === 'heading');

    expect(headings.length).toBeGreaterThan(0);
  });

  test('buttons and links do not have redundant words in their accessible name', () => {
    const redundantWords = ['button', 'link'];

    const nodesWithRedundantNames = allNodes
      .filter((node) => node.role === 'button' || node.role === 'link')
      .filter((node) => redundantWords.some((word) => node.name?.toLowerCase().includes(word)));

    expect(nodesWithRedundantNames).toEqual([]);
  });
});