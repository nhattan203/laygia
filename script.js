const proxyUrl = 'https://script.google.com/macros/s/AKfycbygYrWQZoHJlfEA8hpgiK-ODwzu3FmoEKC51uW_BrzGFnMfkEzmNcx_u5FYHNOgOldC/exec'; // <-- thay đúng link WebApp
const botToken = '7945913782:AAEH8_nwqQeMMxHYRqg1u6yuEwDzGXlq9pM'; // <-- thay bằng token bot
const groupId = -1002434982879; // <-- thay ID nhóm Telegram

async function fetchGia() {
  try {
    const res = await fetch(proxyUrl + '?url=' + encodeURIComponent(`https://api.telegram.org/bot${botToken}/getUpdates`));
    const data = await res.json();
    const messages = data.result.reverse();

    let giaCaPhe = "Không tìm thấy dữ liệu";
    let giaTieu = "Không tìm thấy dữ liệu";

    for (let msg of messages) {
      if (msg.message && msg.message.chat && msg.message.chat.id === groupId) {
        const text = msg.message.text || '';
        if (text.includes('Giá Cà Phê') && giaCaPhe === "Không tìm thấy dữ liệu") {
          giaCaPhe = text;
        } 
        if (text.includes('Giá Tiêu') && giaTieu === "Không tìm thấy dữ liệu") {
          giaTieu = text;
        }
      }
    }

    document.getElementById('giaCaPhe').innerText = giaCaPhe;
    document.getElementById('giaTieu').innerText = giaTieu;

    const now = new Date();
    const timeStr = now.toLocaleTimeString('vi-VN');
    document.getElementById('timeCaPhe').innerText = "Cập nhật lúc: " + timeStr;
    document.getElementById('timeTieu').innerText = "Cập nhật lúc: " + timeStr;
  } catch (e) {
    console.error(e);
    document.getElementById('giaCaPhe').innerText = 'Lỗi tải dữ liệu!';
    document.getElementById('giaTieu').innerText = 'Lỗi tải dữ liệu!';
  }
}

fetchGia();
setInterval(fetchGia, 60000); // update mỗi 1 phút
