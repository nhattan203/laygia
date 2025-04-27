const proxyUrl = 'https://script.google.com/macros/s/AKfycbygYrWQZoHJlfEA8hpgiK-ODwzu3FmoEKC51uW_BrzGFnMfkEzmNcx_u5FYHNOgOldC/exec';
const botToken = '7945913782:AAEH8_nwqQeMMxHYRqg1u6yuEwDzGXlq9pM';
const groupId = -1002434982879;

async function fetchGia() {
    try {
        const res = await fetch(proxyUrl + '?url=' + encodeURIComponent('https://api.telegram.org/bot' + botToken + '/getUpdates'));
        const data = await res.json();
        const messages = data.result.reverse();

        let giaCaPhe = "Không tìm thấy dữ liệu.";
        let giaTieu = "Không tìm thấy dữ liệu.";

        for (let msg of messages) {
            if (msg.message && msg.message.chat && msg.message.chat.id === groupId) {
                const text = msg.message.text || "";

                if (text.toLowerCase().includes('giá cà phê') && giaCaPhe === "Không tìm thấy dữ liệu.") {
                    giaCaPhe = text.replace(/\n/g, '<br>'); // Giữ định dạng xuống dòng
                }

                if (text.toLowerCase().includes('giá tiêu') && giaTieu === "Không tìm thấy dữ liệu.") {
                    giaTieu = text.replace(/\n/g, '<br>');
                }
            }
        }

        document.getElementById('giaCaPhe').innerHTML = giaCaPhe;
        document.getElementById('giaTieu').innerHTML = giaTieu;

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

// Load lúc đầu + tự động làm mới mỗi phút
fetchGia();
setInterval(fetchGia, 1000); // 1000ms = 1 giây

