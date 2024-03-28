const fs = require("fs")
const puppeteer = require("puppeteer")

async function run() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto("https://medium.com/", { timeout: 15000 })

  //  Get a screenshot of the page
  // await page.screenshot({ path: "example.png", fullPage: true })

  //  Get a PDF of the page
  // await page.pdf({ path: 'example.pdf', format: 'A4' });

  //  Get HTML of the page
  // const html = await page.content();

  //  Get title of the page
  // const title = await page.evaluate(() => document.title)

  //  Get text of the page
  // const text = await page.evaluate(() => document.body.innerText);

  //  Get all links
  // const links = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll("a"), (e) => e.href)
  // )
  // console.log("Page links: ", links)

  // fs.writeFile("links.json", JSON.stringify(links), (err) => {
  //   if (err) throw err
  //   console.log("Links saved")
  // })

  await page.screenshot({ path: "example.png" })

  // Scroll to the bottom of the page
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight)
  })

  // Wait for a brief moment for new posts to load
  await new Promise((resolve) => setTimeout(resolve, 3000))

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight)
  })

  // Wait for a brief moment for new posts to load
  await new Promise((resolve) => setTimeout(resolve, 3000))

  await page.screenshot({ path: "example2.png" })

  await page.evaluate(() => {
    const elements = document.querySelectorAll("*")
    for (const element of elements) {
      if (element.textContent === "Load more stories" && element.isConnected) {
        // Additional checks for a more specific element
        if (
          element.classList &&
          element.classList.contains("load-more-button")
        ) {
          // Adjust class name if needed
          console.log("Clicking element with class 'load-more-button'")
          element.click()

          return // Exit the loop after clicking
        } else if (element.tagName === "BUTTON") {
          // Check if it's a button tag
          console.log("Clicking button element")
          element.click()
          return // Exit the loop after clicking
        }
      }
    }
  })

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight)
  })

  // Wait for a brief moment for new posts to load
  await new Promise((resolve) => setTimeout(resolve, 3000))

  await page.screenshot({ path: "example3.png" })

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight)
  })

  // Wait for a brief moment for new posts to load
  await new Promise((resolve) => setTimeout(resolve, 3000))

  await page.screenshot({ path: "example4.png" })

  //  Get all posts titles
  const titles = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".pw-homefeed-item a h2"), (e) => ({
      title: e.innerText,
    }))
  )
  fs.writeFile("titles.json", JSON.stringify(titles), (err) => {
    if (err) throw err
    console.log("titles saved")
  })
  console.log("titles", titles.length)

  await browser.close()
}

run()
