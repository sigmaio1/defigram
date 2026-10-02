const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_FILE = path.join(__dirname, 'data.json');
const OWNER_NUMBER = '+888-888-888-888';
const MAX_USERS = 100;

// ===== БЕЛОРУССКИЕ КРАСИВЫЕ НОМЕРА =====
const BEAUTIFUL_NUMBERS = [
    '+888-888-888-888','+888-111-111-111','+888-222-222-222','+888-333-333-333',
    '+888-444-444-444','+888-555-555-555','+888-666-666-666','+888-777-777-777',
    '+888-999-999-999','+888-000-000-000','+888-123-456-789','+888-987-654-321',
    '+888-100-100-100','+888-200-200-200','+888-300-300-300','+888-500-500-500',
    '+888-700-700-700','+888-800-800-800','+888-900-900-900'
];

// ===== СТРАНЫ МИРА =====
const COUNTRIES = [
    { code: '🇨🇴', name: 'Колумбия', prefix: '+57', digits: 10 },
    { code: '🇺🇸', name: 'США', prefix: '+1', digits: 10 },
    { code: '🇲🇽', name: 'Мексика', prefix: '+52', digits: 10 },
    { code: '🇬🇧', name: 'Великобритания', prefix: '+44', digits: 10 },
    { code: '🇧🇩', name: 'Бангладеш', prefix: '+880', digits: 10 },
    { code: '🇮🇳', name: 'Индия', prefix: '+91', digits: 10 },
    { code: '🇺🇿', name: 'Узбекистан', prefix: '+998', digits: 9 },
    { code: '🇵🇭', name: 'Филиппины', prefix: '+63', digits: 10 },
    { code: '🇿🇦', name: 'Южная Африка', prefix: '+27', digits: 9 },
    { code: '🇹🇷', name: 'Турция', prefix: '+90', digits: 10 },
    { code: '🇨🇱', name: 'Чили', prefix: '+56', digits: 9 },
    { code: '🇰🇿', name: 'Казахстан', prefix: '+77', digits: 10 },
    { code: '🇯🇵', name: 'Япония', prefix: '+81', digits: 10 },
    { code: '🇩🇪', name: 'Германия', prefix: '+49', digits: 11 },
    { code: '🇷🇺', name: 'Россия', prefix: '+7', digits: 10 },
    { code: '🇺🇦', name: 'Украина', prefix: '+380', digits: 9 },
    { code: '🇵🇱', name: 'Польша', prefix: '+48', digits: 9 },
    { code: '🇱🇹', name: 'Литва', prefix: '+370', digits: 8 },
    { code: '🇱🇻', name: 'Латвия', prefix: '+371', digits: 8 },
    { code: '🇪🇪', name: 'Эстония', prefix: '+372', digits: 8 },
    { code: '🇧🇾', name: 'Беларусь', prefix: '+375', digits: 9 },
    { code: '🇫🇷', name: 'Франция', prefix: '+33', digits: 9 },
    { code: '🇮🇹', name: 'Италия', prefix: '+39', digits: 10 },
    { code: '🇪🇸', name: 'Испания', prefix: '+34', digits: 9 },
    { code: '🇨🇳', name: 'Китай', prefix: '+86', digits: 11 },
    { code: '🇰🇷', name: 'Корея', prefix: '+82', digits: 10 },
    { code: '🇧🇷', name: 'Бразилия', prefix: '+55', digits: 11 },
    { code: '🇦🇷', name: 'Аргентина', prefix: '+54', digits: 10 },
    { code: '🇨🇦', name: 'Канада', prefix: '+1', digits: 10 },
    { code: '🇦🇺', name: 'Австралия', prefix: '+61', digits: 9 },
];

// ===== NFT КАТАЛОГ =====
const NFT_CATALOG = [
    { name: 'Сердце', emoji: '💖', price: 15, rarity: 'common' },
    { name: 'Мишка', emoji: '🧸', price: 15, rarity: 'common' },
    { name: 'Подарок', emoji: '🎁', price: 25, rarity: 'common' },
    { name: 'Роза', emoji: '🌹', price: 25, rarity: 'common' },
    { name: 'Торт', emoji: '🎂', price: 50, rarity: 'common' },
    { name: 'Ракета', emoji: '🚀', price: 50, rarity: 'common' },
    { name: 'Букет', emoji: '💐', price: 50, rarity: 'common' },
    { name: 'Пиво', emoji: '🍺', price: 50, rarity: 'common' },
    { name: 'Кубок', emoji: '🏆', price: 100, rarity: 'rare' },
    { name: 'Бриллиант', emoji: '💎', price: 100, rarity: 'rare' },
    { name: 'Кольцо', emoji: '💍', price: 100, rarity: 'rare' },
    { name: 'Шампанское', emoji: '🍾', price: 50, rarity: 'rare' },
    { name: 'Факел', emoji: '🔥', price: 500, rarity: 'rare' },
    { name: 'Мороженое', emoji: '🍦', price: 500, rarity: 'rare' },
    { name: 'Статуя Свободы', emoji: '🗽', price: 600, rarity: 'rare' },
    { name: 'Собака', emoji: '🐕', price: 700, rarity: 'rare' },
    { name: 'Пицца', emoji: '🍕', price: 470, rarity: 'rare' },
    { name: 'Лолипоп', emoji: '🍭', price: 500, rarity: 'rare' },
    { name: 'Эскимо', emoji: '🍫', price: 500, rarity: 'rare' },
    { name: 'Фламинго', emoji: '🦩', price: 515, rarity: 'rare' },
    { name: 'Рюкзак', emoji: '🎒', price: 560, rarity: 'rare' },
    { name: 'Новогодний носок', emoji: '🧦', price: 490, rarity: 'rare' },
    { name: 'Конфета', emoji: '🍬', price: 650, rarity: 'rare' },
    { name: 'Снеговик', emoji: '⛄', price: 480, rarity: 'rare' },
    { name: 'Какашка', emoji: '💩', price: 545, rarity: 'rare' },
    { name: 'Капкейк', emoji: '🧁', price: 513, rarity: 'rare' },
    { name: 'Кэнди-кейн', emoji: '🍬', price: 459, rarity: 'rare' },
    { name: 'Ключ', emoji: '🔑', price: 666, rarity: 'rare' },
    { name: 'Подарочная коробка', emoji: '🎁', price: 500, rarity: 'rare' },
    { name: 'Луна', emoji: '🌙', price: 703, rarity: 'rare' },
    { name: 'Варежка', emoji: '🧤', price: 609, rarity: 'rare' },
    { name: 'Торт с вишней', emoji: '🍰', price: 703, rarity: 'epic' },
    { name: 'Ручка', emoji: '🖊️', price: 953, rarity: 'epic' },
    { name: 'Телефон', emoji: '📱', price: 540, rarity: 'epic' },
    { name: 'Пряник', emoji: '🍪', price: 599, rarity: 'epic' },
    { name: 'Обезьяна', emoji: '🐵', price: 795, rarity: 'epic' },
    { name: 'Какао', emoji: '☕', price: 500, rarity: 'epic' },
    { name: 'Гриб', emoji: '🍄', price: 700, rarity: 'epic' },
    { name: 'Сердце LOVE', emoji: '💝', price: 804, rarity: 'epic' },
    { name: 'Банка с сердечками', emoji: '🫙', price: 703, rarity: 'epic' },
    { name: 'Яйцо', emoji: '🥚', price: 770, rarity: 'epic' },
    { name: 'Ракета 2', emoji: '🚀', price: 791, rarity: 'epic' },
    { name: 'Пончик', emoji: '🍩', price: 520, rarity: 'epic' },
    { name: 'Кот', emoji: '🐱', price: 823, rarity: 'epic' },
    { name: 'Венок', emoji: '🎄', price: 499, rarity: 'epic' },
    { name: 'Вино', emoji: '🍷', price: 620, rarity: 'epic' },
    { name: 'UFC', emoji: '🥊', price: 1625, rarity: 'epic' },
    { name: 'Котёл золота', emoji: '🍀', price: 600, rarity: 'epic' },
    { name: 'Чёрно-белая конфета', emoji: '🍬', price: 598, rarity: 'epic' },
    { name: 'Розовая конфета', emoji: '🍥', price: 1155, rarity: 'epic' },
    { name: '2025', emoji: '🎊', price: 496, rarity: 'epic' },
    { name: 'Блокнот', emoji: '📓', price: 600, rarity: 'epic' },
    { name: 'Кубик', emoji: '🎲', price: 549, rarity: 'epic' },
    { name: 'Мясо', emoji: '🥩', price: 901, rarity: 'epic' },
    { name: 'Бабочка', emoji: '🎀', price: 619, rarity: 'epic' },
    { name: 'Костёр', emoji: '🔥', price: 590, rarity: 'epic' },
    { name: 'Шляпа ковбоя', emoji: '🤠', price: 703, rarity: 'legendary' },
    { name: 'Колокольчик', emoji: '🔔', price: 1065, rarity: 'legendary' },
    { name: 'Мышь', emoji: '🐭', price: 703, rarity: 'legendary' },
    { name: 'Снежный шар', emoji: '🔮', price: 695, rarity: 'legendary' },
    { name: 'Капкейк 2', emoji: '🧁', price: 877, rarity: 'legendary' },
    { name: 'Шапка Санты', emoji: '🎅', price: 550, rarity: 'legendary' },
    { name: 'Звезда', emoji: '⭐', price: 1005, rarity: 'legendary' },
    { name: 'Череп-шар', emoji: '💀', price: 1400, rarity: 'legendary' },
    { name: 'Меховая шапка', emoji: '🧢', price: 2560, rarity: 'legendary' },
    { name: 'Цилиндр', emoji: '🎩', price: 1224, rarity: 'legendary' },
    { name: 'Туфли', emoji: '👠', price: 1919, rarity: 'legendary' },
    { name: 'Сердце с бантом', emoji: '❤️', price: 1206, rarity: 'legendary' },
    { name: 'Золотое сердце', emoji: '💛', price: 5000, rarity: 'legendary' },
    { name: 'Зелье', emoji: '🧪', price: 8000, rarity: 'legendary' },
    { name: 'Роза в стекле', emoji: '🌹', price: 10000, rarity: 'legendary' },
];

const EMOJIS = ['😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇','🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚','😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🤩','🥳','😏','😒','😞','😔','😟','😕','🙁','☹️','😣','😖','😫','😩','🥺','😢','😭','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔','🤭','🤫','🤥','😶','😐','😑','😬','🙄','😯','😦','😧','😮','😲','🥱','😴','🤤','😪','😵','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕','🤑','🤠','😈','👿','👹','👺','🤡','💩','👻','💀','☠️','👽','👾','🤖','🎃'];

let db = { users: {}, messages: [], groups: {}, channels: {}, starsHistory: {} };
let currentUser = null, currentChat = null, isRegisterMode = false;
let refreshTimer = null, voiceInterval = null, voiceSeconds = 0;
let lastMsgCount = 0, selectedGroupUsers = [];

function loadDB() {
    if (fs.existsSync(DB_FILE)) {
        try {
            db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
            if (!db.users) db.users = {};
            if (!db.messages) db.messages = [];
            if (!db.groups) db.groups = {};
            if (!db.channels) db.channels = {};
            if (!db.starsHistory) db.starsHistory = {};
        } catch (e) { console.error(e); }
    }
}
function saveDB() { fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8'); }
function hashPass(p) { return crypto.createHash('sha256').update(p).digest('hex'); }

// ===== АВТОРИЗАЦИЯ =====
function switchMode() {
    isRegisterMode = !isRegisterMode;
    document.getElementById('authSub').textContent = isRegisterMode ? 'Создай новый аккаунт' : 'Войди по номеру телефона';
    document.getElementById('authBtn').textContent = isRegisterMode ? 'Создать аккаунт' : 'Войти';
    document.getElementById('switchText').textContent = isRegisterMode ? 'Уже есть аккаунт?' : 'Нет аккаунта?';
    document.getElementById('switchLink').textContent = isRegisterMode ? 'Войти' : 'Зарегистрироваться';
    document.getElementById('pass2Wrap').style.display = isRegisterMode ? 'block' : 'none';
    document.getElementById('authError').textContent = '';
    checkUserLimit();
}

function checkUserLimit() {
    const count = Object.keys(db.users).length;
    const hint = document.getElementById('phoneHint');
    if (isRegisterMode && count >= MAX_USERS) { hint.textContent = `⚠️ Лимит: ${count}/${MAX_USERS}`; hint.className = 'phone-hint error'; }
    else if (isRegisterMode) { hint.textContent = `Свободно мест: ${MAX_USERS - count}/${MAX_USERS}`; hint.className = 'phone-hint'; }
    else { hint.textContent = ''; hint.className = 'phone-hint'; }
}

function formatPhone(v) {
    // Белорусский формат +888-XXX-XXX-XXX
    if (v.startsWith('+888') || v.startsWith('888')) {
        let d = v.replace(/\D/g, '').slice(0, 12);
        let f = '';
        if (d.length > 0) f = '+' + d.slice(0, 3);
        if (d.length > 3) f += '-' + d.slice(3, 6);
        if (d.length > 6) f += '-' + d.slice(6, 9);
        if (d.length > 9) f += '-' + d.slice(9, 12);
        return f;
    }
    // Международный формат — просто + и цифры
    let d = v.replace(/\D/g, '');
    return d.length > 0 ? '+' + d : '';
}

function validatePhone() {
    const phone = document.getElementById('authPhone').value.trim();
    const hint = document.getElementById('phoneHint');
    if (!phone) { hint.textContent = ''; hint.className = 'phone-hint'; return false; }

    // Владелец
    if (phone === OWNER_NUMBER) { hint.textContent = '👑 Владелец'; hint.className = 'phone-hint owner'; return true; }

    // Белорусские красивые
    if (BEAUTIFUL_NUMBERS.includes(phone)) {
        if (db.users[phone]) { hint.textContent = '⚠️ Номер уже занят'; hint.className = 'phone-hint error'; }
        else { hint.textContent = '✨ Красивый номер — свободен!'; hint.className = 'phone-hint valid'; }
        return true;
    }

    // Международные
    for (const country of COUNTRIES) {
        if (phone.startsWith(country.prefix)) {
            const digitsOnly = phone.replace(/\D/g, '');
            const prefixDigits = country.prefix.replace(/\D/g, '');
            const numberPart = digitsOnly.slice(prefixDigits.length);

            if (numberPart.length === country.digits) {
                if (db.users[phone]) {
                    hint.textContent = `⚠️ ${country.code} ${country.name} — номер занят`;
                    hint.className = 'phone-hint error';
                } else {
                    hint.textContent = `${country.code} ${country.name} — можно регистрировать!`;
                    hint.className = 'phone-hint valid';
                }
                return true;
            } else {
                hint.textContent = `${country.code} ${country.name}: нужно ${country.digits} цифр после ${country.prefix} (сейчас ${numberPart.length})`;
                hint.className = 'phone-hint error';
                return false;
            }
        }
    }

    hint.textContent = '❌ Страна не поддерживается';
    hint.className = 'phone-hint error';
    return false;
}

function doAuth() {
    const phone = document.getElementById('authPhone').value.trim();
    const pass = document.getElementById('authPass').value.trim();
    const pass2 = document.getElementById('authPass2').value.trim();
    const err = document.getElementById('authError');

    if (!phone || !pass) { err.textContent = 'Заполни все поля!'; return; }
    if (pass.length < 4) { err.textContent = 'Пароль минимум 4 символа!'; return; }

    // Проверяем валидность номера
    const isBelarus = phone === OWNER_NUMBER || BEAUTIFUL_NUMBERS.includes(phone);
    let isInternational = false;
    for (const country of COUNTRIES) {
        if (phone.startsWith(country.prefix)) {
            const numberPart = phone.replace(/\D/g, '').slice(country.prefix.replace(/\D/g, '').length);
            if (numberPart.length === country.digits) { isInternational = true; break; }
        }
    }

    if (!isBelarus && !isInternational) { err.textContent = '❌ Неверный номер! Проверь формат.'; return; }

    if (isRegisterMode) {
        if (Object.keys(db.users).length >= MAX_USERS && phone !== OWNER_NUMBER) { err.textContent = `Лимит ${MAX_USERS}!`; return; }
        if (pass !== pass2) { err.textContent = 'Пароли не совпадают!'; return; }
        if (db.users[phone]) { err.textContent = 'Номер занят!'; return; }

        const isOwner = phone === OWNER_NUMBER;
        db.users[phone] = {
            password: hashPass(pass),
            username: '', bio: '', birthday: '',
            stars: isOwner ? 999999999 : 100,
            gifts: 0, nfts: [],
            avatarColor: isOwner ? '#f5c542' : getRandomColor(),
            registered: new Date().toISOString(),
            lastSeen: new Date().toISOString(),
            isOwner: isOwner, verified: isOwner
        };
        if (!db.starsHistory[phone]) db.starsHistory[phone] = [];
        saveDB();
    } else {
        if (!db.users[phone] || db.users[phone].password !== hashPass(pass)) { err.textContent = 'Неверно!'; return; }
    }
    currentUser = phone;
    db.users[phone].lastSeen = new Date().toISOString();
    saveDB();
    showChat();
}

function getRandomColor() {
    const c = ['#5288c1','#e63946','#4dcd5e','#f5a623','#7b68ee','#e91e63','#00bcd4','#ff5722'];
    return c[Math.floor(Math.random() * c.length)];
}

function logout() {
    if (refreshTimer) clearInterval(refreshTimer);
    if (currentUser) { db.users[currentUser].lastSeen = new Date().toISOString(); saveDB(); }
    currentUser = null; currentChat = null;
    document.getElementById('app').classList.add('hidden');
    document.getElementById('authScreen').classList.remove('hidden');
    document.getElementById('authPhone').value = '';
    document.getElementById('authPass').value = '';
    document.getElementById('authPass2').value = '';
    document.getElementById('authError').textContent = '';
}

// ===== ОСНОВНОЙ ЭКРАН =====
function showChat() {
    document.getElementById('authScreen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    const me = db.users[currentUser];
    const isOwner = me.isOwner;
    const avatarText = isOwner ? '👑' : currentUser.slice(-4, -1);
    ['headerAvatar','accAvatar','settingsAvatar'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.textContent = avatarText; el.style.background = me.avatarColor; }
    });
    document.getElementById('accName').textContent = isOwner ? '👑 Владелец' : (me.username || currentUser);
    document.getElementById('accPhone').textContent = currentUser;
    document.getElementById('settingsName').textContent = isOwner ? '👑 Владелец' : (me.username || currentUser);
    document.getElementById('settingsPhone').textContent = currentUser;
    updateStarsUI();
    loadChatList();
    loadEmojiPanel();
    loadStories();

    if (refreshTimer) clearInterval(refreshTimer);
    refreshTimer = setInterval(() => {
        if (currentChat) loadMessages();
        loadChatList();
        updateStarsUI();
        checkNewMessages();
    }, 1500);
}

function updateStarsUI() {
    if (!currentUser) return;
    const stars = db.users[currentUser].stars;
    ['settingsStars','starsBalance','walletStars'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = stars.toLocaleString('ru-RU');
    });
}

function loadStories() {
    const bar = document.getElementById('storiesBar');
    if (!bar) return;
    bar.innerHTML = '<div class="story-item"><div class="story-avatar" style="background:rgba(82,136,193,0.2);border:2px dashed var(--accent);color:var(--accent);">+</div><div class="story-name">Добавить</div></div>';
    Object.keys(db.users).filter(u => u !== currentUser).slice(0, 10).forEach(u => {
        const user = db.users[u];
        bar.innerHTML += `<div class="story-item"><div class="story-avatar" style="background:${user.avatarColor}">${user.isOwner ? '👑' : u.slice(-4, -1)}</div><div class="story-name">${user.username || u.slice(-4, -1)}</div></div>`;
    });
}

function loadChatList() {
    const list = document.getElementById('chatList');
    list.innerHTML = '';
    const items = [];
    Object.keys(db.users).filter(u => u !== currentUser).forEach(u => items.push({ type: 'user', id: u, lastMsg: getLastMsg(currentUser, u) }));
    Object.keys(db.groups).filter(g => db.groups[g].members.includes(currentUser)).forEach(g => items.push({ type: 'group', id: g, lastMsg: getLastMsg(currentUser, g) }));
    Object.keys(db.channels).forEach(c => items.push({ type: 'channel', id: c, lastMsg: getLastMsg(currentUser, c) }));

    items.sort((a, b) => {
        const tA = a.lastMsg ? new Date(a.lastMsg.date).getTime() : 0;
        const tB = b.lastMsg ? new Date(b.lastMsg.date).getTime() : 0;
        return tB - tA;
    });

    let totalUnread = 0;
    if (items.length === 0) {
        list.innerHTML = '<div style="padding:20px;color:#7f91a4;text-align:center;font-size:13px;">Нет чатов</div>';
    }

    items.forEach(item => {
        const isGroup = item.type === 'group';
        const isChannel = item.type === 'channel';
        const user = db.users[item.id];
        const isOwner = user?.isOwner;
        const color = isGroup ? '#7b68ee' : isChannel ? '#e63946' : (user?.avatarColor || '#5288c1');
        const unread = db.messages.filter(m => m.sender === item.id && m.receiver === currentUser && !m.read).length;
        totalUnread += unread;
        let displayName = item.id;
        if (isOwner) displayName = '👑 Владелец';
        const icon = isGroup ? '👥' : isChannel ? '📢' : (isOwner ? '👑' : item.id.slice(-4, -1));

        let lastText = 'нет сообщений';
        if (item.lastMsg) {
            if (item.lastMsg.type === 'gift') lastText = `${item.lastMsg.giftEmoji} Подарок`;
            else lastText = stripHtml(item.lastMsg.text).substring(0, 35);
        }

        const el = document.createElement('div');
        el.className = 'chat-item' + (item.id === currentChat ? ' active' : '');
        el.dataset.user = item.id;
        el.dataset.type = item.type;
        el.innerHTML = `
            <div class="chat-item-avatar" style="background:${color}">${icon}${!isGroup && !isChannel && isUserOnline(item.id) ? '<div class="online-dot"></div>' : ''}</div>
            <div class="chat-item-info">
                <div class="chat-item-top"><div class="chat-item-name">${displayName}</div><div class="chat-item-time">${item.lastMsg ? item.lastMsg.time : ''}</div></div>
                <div class="chat-item-bottom"><div class="chat-item-last">${escapeHtml(lastText)}</div>${unread > 0 ? `<div class="chat-item-unread">${unread}</div>` : ''}</div>
            </div>`;
        el.onclick = () => openChat(item.id);
        list.appendChild(el);
    });

    const badge = document.getElementById('badgeAll');
    if (badge) { badge.textContent = totalUnread > 0 ? totalUnread : ''; badge.style.display = totalUnread > 0 ? 'block' : 'none'; }
}

function stripHtml(html) { const tmp = document.createElement('div'); tmp.innerHTML = html; return tmp.textContent || ''; }
function getLastMsg(a, b) {
    const msgs = db.messages.filter(m => (m.sender === a && m.receiver === b) || (m.sender === b && m.receiver === a));
    return msgs.length > 0 ? msgs[msgs.length - 1] : null;
}
function isUserOnline(u) {
    if (!db.users[u] || !db.users[u].lastSeen) return false;
    return (Date.now() - new Date(db.users[u].lastSeen).getTime()) < 60000;
}
function filterChats() {
    const q = document.getElementById('chatSearch').value.toLowerCase();
    document.querySelectorAll('.chat-item').forEach(item => {
        item.style.display = item.dataset.user.toLowerCase().includes(q) ? 'flex' : 'none';
    });
}
function filterFolder(folder, el) {
    document.querySelectorAll('.folder-icon').forEach(f => f.classList.remove('active'));
    el.classList.add('active');
    document.querySelectorAll('.chat-item').forEach(item => {
        if (folder === 'all') item.style.display = 'flex';
        else if (folder === 'unread') item.style.display = item.querySelector('.chat-item-unread') ? 'flex' : 'none';
        else item.style.display = item.dataset.type === folder ? 'flex' : 'none';
    });
}
function toggleAccountMenu() { document.getElementById('accountMenu').classList.toggle('open'); }
function toggleSearch() { document.getElementById('messageSearch').classList.toggle('hidden'); }
function toggleRightPanel() { document.getElementById('rightPanel').classList.toggle('hidden'); }

function openChat(name) {
    currentChat = name;
    document.getElementById('emptyChat').classList.add('hidden');
    document.getElementById('chatView').classList.remove('hidden');
    const user = db.users[name];
    const isOwner = user?.isOwner;
    const isGroup = !!db.groups[name];
    const isChannel = !!db.channels[name];
    let displayName = name;
    if (isOwner) displayName = '👑 Владелец';
    document.getElementById('chatViewName').textContent = displayName;
    document.getElementById('chatViewStatus').textContent = isGroup
        ? `${db.groups[name].members.length} участников`
        : isChannel ? 'канал' : (isUserOnline(name) ? 'онлайн' : 'был(а) недавно');
    const icon = isGroup ? '👥' : isChannel ? '📢' : (isOwner ? '👑' : name.slice(-4, -1));
    document.getElementById('chatViewAvatar').textContent = icon;
    document.getElementById('chatViewAvatar').style.background = isGroup ? '#7b68ee' : isChannel ? '#e63946' : (user?.avatarColor || '#5288c1');
    loadMessages();
    loadChatList();
    document.getElementById('msgInput').focus();
}

function loadMessages() {
    if (!currentChat) return;
    const box = document.getElementById('messages');
    box.innerHTML = '';
    const msgs = db.messages.filter(m =>
        (m.sender === currentUser && m.receiver === currentChat) ||
        (m.sender === currentChat && m.receiver === currentUser)
    );
    if (msgs.length === 0) {
        box.innerHTML = '<div style="text-align:center;color:#7f91a4;padding:40px;font-size:13px;">Сообщений пока нет</div>';
        return;
    }
    let lastDate = null;
    msgs.forEach(m => {
        const d = m.date ? new Date(m.date).toDateString() : null;
        if (d && d !== lastDate) {
            const divider = document.createElement('div');
            divider.style.cssText = 'text-align:center;color:#7f91a4;font-size:11px;padding:8px 0;';
            const today = new Date().toDateString();
            const yesterday = new Date(Date.now() - 86400000).toDateString();
            divider.textContent = d === today ? 'Сегодня' : d === yesterday ? 'Вчера' : new Date(m.date).toLocaleDateString('ru-RU', {day:'numeric',month:'long'});
            box.appendChild(divider);
            lastDate = d;
        }

        const isMine = m.sender === currentUser;

        if (m.type === 'gift') {
            const giftCard = document.createElement('div');
            giftCard.className = 'gift-message';
            giftCard.innerHTML = `
                <div class="gift-header">${isMine ? 'Вы отправили подарок' : `${m.sender} отправил(а) Вам подарок`} стоимостью ${m.giftPrice} звёзд <span style="float:right;color:#7f91a4;font-size:12px;">${m.time}</span></div>
                <div class="gift-card">
                    <div class="gift-card-emoji">${m.giftEmoji}</div>
                    <div class="gift-card-title">Подарок от ${m.sender}</div>
                    <div class="gift-card-sub">Вы обменяли подарок на ${Math.floor(m.giftPrice * 0.87)} звёзд.</div>
                    <button class="gift-card-btn" onclick="alert('Просмотр подарка #${m.giftId}')">Просмотр</button>
                </div>`;
            box.appendChild(giftCard);
            return;
        }

        const div = document.createElement('div');
        div.className = 'message ' + (isMine ? 'out' : 'in');
        div.innerHTML = `<div>${m.text}</div><div class="msg-time">${m.time || ''}${isMine ? ' ✓✓' : ''}</div>`;
        box.appendChild(div);
    });
    box.scrollTop = box.scrollHeight;
    msgs.forEach(m => { if (m.receiver === currentUser) m.read = true; });
    saveDB();
}

function escapeHtml(t) { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

function sendMessage() {
    if (!currentChat) return;
    const input = document.getElementById('msgInput');
    const text = input.value.trim();
    if (!text) return;
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    db.messages.push({ sender: currentUser, receiver: currentChat, text, time, date: now.toISOString(), read: false });
    saveDB();
    input.value = '';
    loadMessages();
    loadChatList();
}

function searchMessages() {
    const q = document.getElementById('msgSearchInput').value.toLowerCase();
    document.querySelectorAll('.message').forEach(msg => {
        const t = msg.querySelector('div')?.textContent.toLowerCase() || '';
        msg.style.display = t.includes(q) ? '' : 'none';
    });
}

// НАСТРОЙКИ
function openSettings() {
    document.getElementById('accountMenu').classList.remove('open');
    document.getElementById('settingsModal').classList.add('open');
    updateStarsUI();
}
function openNotifSettings() { document.getElementById('notifSettingsModal').classList.add('open'); }
function openPrivacySettings() { document.getElementById('privacySettingsModal').classList.add('open'); }
function openAccountSettings() {
    const me = db.users[currentUser];
    document.getElementById('editUsername').value = me.username || '';
    document.getElementById('editBio').value = me.bio || '';
    document.getElementById('editBirthday').value = me.birthday || '';
    document.getElementById('accountSettingsModal').classList.add('open');
}
function saveAccount() {
    const me = db.users[currentUser];
    me.username = document.getElementById('editUsername').value.trim();
    me.bio = document.getElementById('editBio').value.trim();
    me.birthday = document.getElementById('editBirthday').value.trim();
    saveDB();
    document.getElementById('settingsName').textContent = me.isOwner ? '👑 Владелец' : (me.username || currentUser);
    closeModal('accountSettingsModal');
    alert('✅ Сохранено!');
}
function changeLang() {
    const langs = ['Русский', 'English', 'Беларуская', 'Українська'];
    const cur = document.getElementById('langVal').textContent;
    const next = langs[(langs.indexOf(cur) + 1) % langs.length];
    document.getElementById('langVal').textContent = next;
}
function toggleTheme() {
    document.body.classList.toggle('light');
    document.getElementById('themeVal').textContent = document.body.classList.contains('light') ? 'Выкл' : 'Вкл';
}

// ЗВЁЗДЫ
function openStars() {
    closeModal('settingsModal');
    document.getElementById('starsModal').classList.add('open');
    updateStarsUI();
    renderStarsHistory();
}
function renderStarsHistory() {
    const hist = db.starsHistory[currentUser] || [];
    const box = document.getElementById('starsHistory');
    if (hist.length === 0) { box.innerHTML = '<div style="color:#7f91a4;font-size:13px;text-align:center;padding:20px;">Нет операций</div>'; return; }
    box.innerHTML = hist.slice().reverse().slice(0, 20).map(h => `
        <div class="stars-history-item">
            <div><div>${h.title}</div><div style="color:#7f91a4;font-size:11px;margin-top:2px;">${new Date(h.date).toLocaleString('ru-RU')}</div></div>
            <div class="amount ${h.amount > 0 ? 'plus' : 'minus'}">${h.amount > 0 ? '+' : ''}${h.amount} ⭐</div>
        </div>`).join('');
}
function openBuyStars() {
    document.getElementById('starsModal').classList.remove('open');
    const list = document.getElementById('buyStarsList');
    list.innerHTML = '';
    const packages = [
        { stars: 100, price: 2.05 }, { stars: 250, price: 4.84 }, { stars: 500, price: 9.49 },
        { stars: 1000, price: 18.79 }, { stars: 2500, price: 46.99 }, { stars: 10000, price: 186.99 },
        { stars: 50000, price: 929.00 }, { stars: 150000, price: 2799.00 }
    ];
    packages.forEach(pkg => {
        const item = document.createElement('div');
        item.className = 'buy-star-item';
        item.innerHTML = `<div class="bs-left">⭐ ${pkg.stars.toLocaleString('ru-RU')} звёзд</div><div class="bs-right">$${pkg.price.toFixed(2)}</div>`;
        item.onclick = () => buyStars(pkg.stars, pkg.price);
        list.appendChild(item);
    });
    document.getElementById('buyStarsModal').classList.add('open');
}
function buyStars(count, price) {
    db.users[currentUser].stars += count;
    if (!db.starsHistory[currentUser]) db.starsHistory[currentUser] = [];
    db.starsHistory[currentUser].push({ title: `Покупка ${count} звёзд`, amount: count, date: new Date().toISOString() });
    saveDB();
    updateStarsUI();
    closeModal('buyStarsModal');
    document.getElementById('starsModal').classList.add('open');
    renderStarsHistory();
}
function openGiftToFriend() { alert('🎁 Подарить звёзды друзьям'); }
function openWallet() {
    document.getElementById('accountMenu').classList.remove('open');
    document.getElementById('walletModal').classList.add('open');
    updateStarsUI();
}

// ПОДАРКИ
function sendGift() {
    if (!currentChat) { alert('Сначала выбери чат!'); return; }
    if (!db.users[currentChat]) { alert('Подарки можно отправлять только пользователям!'); return; }
    openNftModal();
}
function openNftModal() {
    const grid = document.getElementById('nftGrid');
    grid.innerHTML = '';
    NFT_CATALOG.forEach((nft, idx) => {
        const card = document.createElement('div');
        card.className = 'nft-card';
        card.innerHTML = `<div class="nft-emoji">${nft.emoji}</div><div class="nft-price">⭐ ${nft.price}</div>`;
        card.onclick = () => buyNft(idx);
        grid.appendChild(card);
    });
    document.getElementById('nftModal').classList.add('open');
}
function buyNft(idx) {
    if (!currentChat) return;
    const nft = NFT_CATALOG[idx];
    if (db.users[currentUser].stars < nft.price) { alert(`❌ Не хватает звёзд!\nНужно: ${nft.price} ⭐\nУ тебя: ${db.users[currentUser].stars} ⭐`); return; }
    db.users[currentUser].stars -= nft.price;
    if (!db.users[currentChat].nfts) db.users[currentChat].nfts = [];
    const nftId = crypto.randomBytes(4).toString('hex').toUpperCase();
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    db.users[currentChat].nfts.push({ name: nft.name, emoji: nft.emoji, price: nft.price, rarity: nft.rarity, id: nftId, from: currentUser, date: now.toISOString() });
    db.users[currentChat].gifts = (db.users[currentChat].gifts || 0) + 1;
    db.messages.push({
        sender: currentUser, receiver: currentChat, type: 'gift',
        giftEmoji: nft.emoji, giftName: nft.name, giftPrice: nft.price, giftRarity: nft.rarity, giftId: nftId,
        time, date: now.toISOString(), read: false
    });
    if (!db.starsHistory[currentUser]) db.starsHistory[currentUser] = [];
    db.starsHistory[currentUser].push({ title: `Подарок "${nft.name}" для ${currentChat}`, amount: -nft.price, date: now.toISOString() });
    saveDB();
    updateStarsUI();
    loadMessages();
    loadChatList();
    closeModal('nftModal');
    alert(`✅ Подарок "${nft.name}" отправлен!`);
}
function sendGiftFromProfile() { if (currentChat) sendGift(); }

// ПРОФИЛЬ
function openProfile(phone) {
    if (!phone || !db.users[phone]) return;
    const user = db.users[phone];
    const isOwner = user.isOwner;
    document.getElementById('modalAvatar').textContent = isOwner ? '👑' : phone.slice(-4, -1);
    document.getElementById('modalAvatar').style.background = user.avatarColor;
    document.getElementById('modalName').textContent = isOwner ? '👑 Владелец' : (user.username || phone);
    document.getElementById('modalStatus').textContent = isUserOnline(phone) ? 'онлайн' : 'был(а) недавно';
    document.getElementById('modalStars').textContent = user.stars.toLocaleString('ru-RU');
    document.getElementById('modalGifts').textContent = user.gifts || 0;
    document.getElementById('modalDate').textContent = user.registered ? new Date(user.registered).toLocaleDateString('ru-RU') : '—';
    const gl = document.getElementById('modalGiftList');
    gl.innerHTML = '';
    if (user.nfts && user.nfts.length > 0) {
        user.nfts.forEach(nft => {
            const s = document.createElement('span');
            s.className = 'gift-item';
            s.textContent = nft.emoji;
            s.title = `${nft.name} (#${nft.id}) от ${nft.from}`;
            gl.appendChild(s);
        });
    } else {
        gl.innerHTML = '<span style="color:#7f91a4;font-size:12px;">Нет подарков</span>';
    }
    document.getElementById('profileModal').classList.add('open');
}
function openMyProfile() { document.getElementById('accountMenu').classList.remove('open'); openProfile(currentUser); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// ГРУППЫ И КАНАЛЫ
function openNewChat() {
    document.getElementById('accountMenu').classList.remove('open');
    selectedGroupUsers = [];
    document.getElementById('groupName').value = '';
    const picker = document.getElementById('userPicker');
    picker.innerHTML = '';
    const users = Object.keys(db.users).filter(u => u !== currentUser);
    if (users.length === 0) {
        picker.innerHTML = '<div style="color:#7f91a4;font-size:13px;text-align:center;padding:20px;">Нет других пользователей</div>';
    } else {
        users.forEach(u => {
            const user = db.users[u];
            const el = document.createElement('div');
            el.className = 'user-pick-item';
            el.dataset.user = u;
            el.innerHTML = `<div class="user-pick-avatar" style="background:${user.avatarColor}">${user.isOwner ? '👑' : u.slice(-4, -1)}</div><span>${user.isOwner ? '👑 Владелец' : (user.username || u)}</span><span class="user-pick-check">✓</span>`;
            el.onclick = () => toggleUserPick(u, el);
            picker.appendChild(el);
        });
    }
    document.getElementById('newChatModal').classList.add('open');
}
function toggleUserPick(user, el) {
    const idx = selectedGroupUsers.indexOf(user);
    if (idx >= 0) { selectedGroupUsers.splice(idx, 1); el.classList.remove('selected'); }
    else { selectedGroupUsers.push(user); el.classList.add('selected'); }
}
function createGroup() {
    const name = document.getElementById('groupName').value.trim();
    if (!name) { alert('Введи название!'); return; }
    if (selectedGroupUsers.length === 0) { alert('Выбери хотя бы одного участника!'); return; }
    if (db.groups[name]) { alert('Уже есть!'); return; }
    db.groups[name] = { name, members: [currentUser, ...selectedGroupUsers], created: new Date().toISOString(), creator: currentUser };
    saveDB();
    closeModal('newChatModal');
    loadChatList();
    openChat(name);
    alert(`✅ Группа "${name}" создана!`);
}
function openNewChannel() {
    document.getElementById('accountMenu').classList.remove('open');
    document.getElementById('channelName').value = '';
    document.getElementById('channelDesc').value = '';
    document.getElementById('newChannelModal').classList.add('open');
}
function createChannel() {
    const name = document.getElementById('channelName').value.trim();
    const desc = document.getElementById('channelDesc').value.trim();
    if (!name) { alert('Введи название!'); return; }
    if (db.channels[name]) { alert('Уже есть!'); return; }
    db.channels[name] = { name, desc, created: new Date().toISOString(), creator: currentUser, subscribers: [currentUser] };
    saveDB();
    closeModal('newChannelModal');
    loadChatList();
    openChat(name);
    alert(`✅ Канал "${name}" создан!`);
}

// ПРАВАЯ ПАНЕЛЬ
function switchRightTab(tab, el) {
    document.querySelectorAll('.right-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    if (tab === 'emoji') loadEmojiPanel();
    else { document.getElementById('rightContent').innerHTML = '<div style="color:#7f91a4;grid-column:span 7;text-align:center;padding:40px;">Скоро</div>'; }
}
function loadEmojiPanel() {
    const c = document.getElementById('rightContent');
    if (!c) return;
    c.innerHTML = '';
    EMOJIS.forEach(e => {
        const cell = document.createElement('div');
        cell.className = 'emoji-cell';
        cell.textContent = e;
        cell.onclick = () => { document.getElementById('msgInput').value += e; document.getElementById('msgInput').focus(); };
        c.appendChild(cell);
    });
}

// ГОЛОСОВОЕ
function showVoiceUI() {
    if (!currentChat) return;
    voiceSeconds = 0;
    document.getElementById('voiceTime').textContent = '00:00';
    document.getElementById('voiceModal').classList.add('open');
    voiceInterval = setInterval(() => {
        voiceSeconds++;
        const m = Math.floor(voiceSeconds / 60).toString().padStart(2, '0');
        const s = (voiceSeconds % 60).toString().padStart(2, '0');
        document.getElementById('voiceTime').textContent = `${m}:${s}`;
    }, 1000);
}
function cancelVoice() { clearInterval(voiceInterval); document.getElementById('voiceModal').classList.remove('open'); }
function sendVoice() {
    clearInterval(voiceInterval);
    document.getElementById('voiceModal').classList.remove('open');
    if (!currentChat) return;
    const m = Math.floor(voiceSeconds / 60).toString().padStart(2, '0');
    const s = (voiceSeconds % 60).toString().padStart(2, '0');
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    db.messages.push({ sender: currentUser, receiver: currentChat, text: `🎤 Голосовое ${m}:${s}`, time, date: now.toISOString(), read: false });
    saveDB();
    loadMessages();
}

// ЗВОНКИ
function startCall() {
    if (!currentChat) return;
    const user = db.users[currentChat];
    if (!user) return;
    document.getElementById('callAvatar').textContent = user.isOwner ? '👑' : currentChat.slice(-4, -1);
    document.getElementById('callAvatar').style.background = user.avatarColor;
    document.getElementById('callName').textContent = user.username || currentChat;
    document.getElementById('callStatus').textContent = 'Вызов...';
    document.getElementById('callModal').classList.add('open');
    setTimeout(() => { document.getElementById('callStatus').textContent = 'Соединение...'; }, 2000);
    setTimeout(() => { document.getElementById('callStatus').textContent = 'Разговор'; }, 4000);
}
function endCall() { document.getElementById('callModal').classList.remove('open'); }

// УВЕДОМЛЕНИЯ
function checkNewMessages() {
    const total = db.messages.length;
    if (lastMsgCount > 0 && total > lastMsgCount) {
        const last = db.messages[db.messages.length - 1];
        if (last.receiver === currentUser && last.sender !== currentUser) {
            document.title = `💬 Новое от ${last.sender}`;
            setTimeout(() => { document.title = 'Defigram BETA'; }, 3000);
        }
    }
    lastMsgCount = total;
}

// СТАРТ
loadDB();

document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('authPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = formatPhone(e.target.value);
            validatePhone();
        });
    }
    document.addEventListener('click', (e) => {
        const menu = document.getElementById('accountMenu');
        const btn = document.querySelector('.hamburger');
        if (menu && menu.classList.contains('open') && !menu.contains(e.target) && btn && !btn.contains(e.target)) {
            menu.classList.remove('open');
        }
    });
});