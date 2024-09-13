import { chromium, Browser, Page } from 'playwright';
import { urls } from './urls';
import { cleanNumberOfFriends, getFriends, login, screenshot, writeUsersToCsv } from './utils';
import { User } from './types';

async function scrapeFacebookProfile(urls: string[]): Promise<User[]> {
  const browser: Browser = await chromium.launch({ headless: false });
  const page: Page = await browser.newPage();

  const users: User[] = [];

  try {
    await login(page);

    for (const url of urls) {
      try {
        await page.goto(url, { waitUntil: 'networkidle' });

        let user: User = {
          url,
          name: null,
          numberOfFriends: null,
          type: '',
        };

        await page.waitForSelector('h1');
        const name = await page.textContent('h1');
        user.name = name;

        const numberOfFriends = await getFriends(page);
        if (numberOfFriends) {
          if (numberOfFriends === 'Privacidade') {
            user.type = 'privado';
            await screenshot(page, name);
          } else {
            user.type = 'publico';
            const numberOfFriendsClean = cleanNumberOfFriends(numberOfFriends);
            user.numberOfFriends = numberOfFriendsClean;
            if (numberOfFriendsClean && numberOfFriendsClean < 10) {
              await screenshot(page, name);
            }
          }
        }

        users.push(user);
        console.log(`Perfil processado: ${user.name}`);

      } catch (error) {
        console.error(`Erro ao raspar ${url}:`, error);
      }
    }
  } finally {
    await browser.close();
  }
  
  return users;
}

(async () => {
  const profileUrls = urls;

  try {
    const users = await scrapeFacebookProfile(profileUrls);
    await writeUsersToCsv(users)
    console.log('Dados coletados:', users);
  } catch (error) {
    console.error('Erro ao executar a raspagem:', error);
  }
})();
