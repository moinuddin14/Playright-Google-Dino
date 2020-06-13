const { chromium } = require("playwright");

class TRex {
  constructor() {}
  async trexDemo() {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage({ offline: true });

    try {
      await page.goto("http://google.com");
    } catch (error) {
    }

    await page.exposeFunction("smallJump", () => page.keyboard.press("Space"));
    await page.exposeFunction(
      "longJump",
      () => page.keyboard.press("Space", { delay: 100 }),
    );
    await page.exposeFunction(
      "duckDown",
      () => page.keyboard.down("ArrowDown"),
    );
    await page.exposeFunction("upDown", () => page.keyboard.up("ArrowDown"));

    await page.keyboard.press("Space");

    await page.evaluate((page) => {
      setInterval(() => {
        // Get the first obstacle in every run
        const obstacle = Runner.instance_.horizon.obstacles[0];
        // Check if obstacle is present and
        // also if its less than 120 pixels distance
        if (obstacle && obstacle.xPos < 120) {
          // Check if the obstaxcle type is PTERODACTYL and
          // its distance is less than 100 pixels
          if (
            obstacle.typeConfig.type === "PTERODACTYL" && obstacle.yPos < 100
          ) {
            // duck down the TRex
            duckDown();
          } else {
            // reset the keyboard so that TRex doesn't keep jumping
            upDown();
            // Check if obstacle type is CACTUS_LARGE
            if (obstacle.typeConfig.type === "CACTUS_LARGE") {
              // Long jump 38 pixels distance
              longJump();
            } else {
              // Small jump 32 pixels
              smallJump();
            }
          }
        } else {
          // reset the keyboard so that TRex doesn't keep jumping
          upDown();
        }
      });
    });
  }
}

const trex = new TRex();

trex.trexDemo();
