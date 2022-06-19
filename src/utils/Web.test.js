import { getJson, getLocale } from './Web';

test('makes request to a wrong website (without callback)', async () => {

    let didThrow = false;
    try {
        await getJson('https://fkdsjfkljksldfj.edu.br');
    }catch(e){
        didThrow = true;
    }

    expect( didThrow ).toBe(true);

});

test('makes request to a wrong website (with callback)', async () => {

    let didThrow = await getJson('https://fkdsjfkljksldfj.edu.br', e => true);
    expect( didThrow ).toBe(true);

});

test('fetches English, Portuguese, and Chinese Locale', async () => {

    let locale = await getLocale('en');
    expect( locale.app_title ).toBe('React Books Service');
    locale = await getLocale('pt');
    expect( locale.app_title ).toBe('Serviço React Books');
    locale = await getLocale('zh');
    expect( locale.app_title ).toBe('React Books 网上服务');

});

test('with wrong language, localization must fail (with callback)', async () => {

    let didThrow = await getLocale('xx', () => true);
    expect( didThrow ).toBe(true);

});

test('with wrong language, localization must fail (without callback)', async () => {
    
    let didThrow = false;
    try{
        await getLocale('xx');
    } catch(e){
        didThrow = true;
    }

    expect( didThrow ).toBe(true);

});

test('with wrong language, fetches english fallback localization', async () => {

    let locale = await getLocale('xx', (_, defLocale) => defLocale);
    expect( locale.app_title ).toBe('React Books Service');

});