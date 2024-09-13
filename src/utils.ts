import { Page } from "playwright";
import dotenv from 'dotenv';
import { createObjectCsvWriter } from "csv-writer";
import { User } from "./types";
import path from 'path';
import fs from 'fs';

dotenv.config();

export async function login(page: Page) {
  try {
    await page.goto('https://www.facebook.com/', { waitUntil: 'networkidle' });

    await page.fill('input[name="email"]', process.env.FACEBOOK_EMAIL || '');
    await page.fill('input[name="pass"]', process.env.FACEBOOK_PASSWORD || '');
    await page.click('button[name="login"]');

    await page.waitForTimeout(30000);
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    throw error; // Propaga o erro para que o fluxo principal lide com ele
  }
}

export async function getFriends(page: Page) {
  try {
    const span = await page.locator('a.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1sur9pj.xkrqix3.xi81zsa.x1s688f').first().textContent();
  
    if (span) {
      return span.replace('amigos', '').trim();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erro ao obter o número de amigos:', error);
    return null;
  }
}

export async function getCity(page: Page) {
  try {
    const links = await page.locator('a.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1sur9pj.xkrqix3.xzsf02u.x1s688f');
    const allLinks = await links.elementHandles();

    for (const [index, link] of allLinks.entries()) {
      const label = await link.textContent();
      console.log(`${index + 1}: ${label}`);
    }
  } catch (error) {
    console.error('Erro ao obter a cidade:', error);
  }
}

export function cleanNumberOfFriends(value: string | null) {
  if (!value) return null;
  value = value.replace('\u00A0', '').replace(/\s/g, ''); // Remove caracteres especiais e espaços
  if (value.includes('mil')) {
    const number = parseFloat(value.replace('mil', '').replace(',', '.')) * 1000;
    return Math.round(number);
  } else {
    const number = parseInt(value.replace(/\D/g, ''), 10); // Remove caracteres não numéricos
    return isNaN(number) ? null : number;
  }
}

export async function writeUsersToCsv(users: User[]) {
  const csvWriter = createObjectCsvWriter({
    path: 'users.csv',
    header: [
      { id: 'url', title: 'URL' },
      { id: 'name', title: 'Name' },
      { id: 'numberOfFriends', title: 'Number of Friends' },
      { id: 'type', title: 'Type' },
    ],
  });

  try {
    await csvWriter.writeRecords(users);
    console.log('Dados gravados com sucesso no arquivo CSV.');
  } catch (error) {
    console.error('Erro ao gravar dados no arquivo CSV:', error);
  }
}

export async function screenshot(page: Page, name: string | null) {
  try {
    const screenshotsDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    const screenshotPath = path.join(screenshotsDir, `${name?.replace(/[^a-zA-Z0-9]/g, '_') || 'screenshot'}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`Screenshot salvo: ${screenshotPath}`);
  } catch (error) {
    console.error('Erro ao salvar screenshot:', error);
  }
}
