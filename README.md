# ⚡ Pokémon Card Battle — Telegram Web App (TWA)

Game thẻ bài Pokémon đa nền tảng chạy trực tiếp trên **Telegram Web App** và lưu trữ hoàn toàn miễn phí trên **GitHub Pages**.

🔗 **Trải Nghiệm Trực Tiếp (GitHub Pages):**  
👉 [https://hanhk112023-jpg.github.io/pokemon-twa/](https://hanhk112023-jpg.github.io/pokemon-twa/)

---

## 🌟 Tính Năng Nổi Bật

### 1. 📦 Hệ Thống Mở Gói Thẻ Bài 3D (Booster Pack Gacha)
- **3 Cấp độ Gói Thẻ**:
  - **Poké Pack** (100 Xu): Tỷ lệ Common cao, cơ hội mở Rare.
  - **Great Pack** (250 Xu): Đảm bảo ít nhất 1 thẻ Rare hoặc Epic.
  - **Master Mythic Pack** (500 Xu): Đảm bảo thẻ Epic, tỷ lệ cao mở được Legendary & Mythic.
- **Hiệu ứng xé gói thẻ 3D (Foil Tear)** & lật từng lá bài với hiệu ứng chiều sâu 3D (Perspective Flip).
- **Holographic Foil Shimmer**: Hiệu ứng lấp lánh phản quang 7 màu cho các thẻ bài Thần Thoại (Rayquaza, Mewtwo, Arceus, Charizard, Gengar...).
- **Nút "Lật Tất Cả" (Flip All)** & rung phản hồi xúc giác (Haptic Feedback) theo tiêu chuẩn Telegram SDK.

### 2. ⚔️ Đấu Trường Chiến Đấu Theo Lượt (Turn-Based Elemental Arena)
- **Hệ thống khắc chế thuộc tính**: Bảng ma trận 9 hệ nguyên tố (Lửa, Nước, Cỏ, Điện, Tâm Linh, Rồng, Thép, Giác Đấu, Thường). Đòn đánh siêu hiệu quả x2 sát thương!
- **Hệ thống Năng Lượng (Energy Points - EP)**: Tích lũy năng lượng qua các đòn tấn công cơ bản hoặc phòng thủ để tung Tuyệt Kỹ Hệ bộc phá.
- **Chiêu thức & Phòng ngự chiến thuật**:
  - `Tấn công thường`: Gây sát thương vật lý và nạp 1 EP.
  - `Tuyệt kỹ hệ`: Đòn đánh hệ tiêu hao EP với tỷ lệ bạo kích cực lớn.
  - `Phòng thủ`: Giảm 50% sát thương nhận vào ở lượt kế tiếp và hồi 1 EP.
  - `Dược phẩm`: Hồi phục 35% HP (2 lần sử dụng mỗi trận đấu).
- **Hệ thống Nhà Thi Đấu (Gym Leaders)**: Thử thách từ Brock, Misty, Lt. Surge, Sabrina, Blaine đến Quán Quân Red!

### 3. 🃏 Quản Lý Bộ Sưu Tập & Nâng Cấp Thẻ Bài (Card Binder)
- Lưu trữ thẻ bài mở được với phân loại phẩm cấp: *Common, Rare, Epic, Legendary, Mythic*.
- Bộ lọc thông minh theo Hệ (Element) và Phẩm Cấp (Rarity).
- Tính năng **Nâng Cấp (Level Up)**: Tiêu hao Xu để gia tăng chỉ số HP, ATK, DEF.
- Chọn Pokémon làm Đội Trưởng Xuất Trận chính.

### 4. 👤 Hồ Sơ Huấn Luyện Viên & Nhiệm Vụ Hằng Ngày
- Tự động nhận diện danh tính Huấn Luyện Viên từ Telegram (`initDataUnsafe`).
- Thống kê chi tiết: Tỷ lệ thắng (Win Rate), Tổng số trận thắng/thua, Số gói thẻ đã mở.
- Nhiệm vụ hằng ngày nhận thêm Xu và quà điểm danh miễn phí mỗi 12 giờ.
- Nút **Khoe Thẻ Lên Chat**: Chia sẻ ngay thành tích và thẻ bài siêu hiếm vào các nhóm Telegram.

### 5. 🔊 Âm Thanh Retro 8-bit Synth & Xúc Giác Haptic
- Sử dụng **Web Audio API thuần** để tổng hợp âm thanh 8-bit chiptune (âm thanh xé gói thẻ, tiếng vung đòn, bạo kích, siêu hiệu quả, khúc nhạc chiến thắng).
- Hoạt động 100% không cần tải bất kỳ file mp3/wav nào, mượt mà và không giật lag.
- Tích hợp sâu Telegram WebApp Haptic (`light`, `medium`, `heavy`, `success`, `error`).

---

## 🚀 Hướng Dẫn Tích Hợp Vào Bot Telegram (BotFather)

Để mở game trực tiếp trong khung chat Telegram dưới dạng Web App:

1. Mở bot **[@BotFather](https://t.me/BotFather)** trên Telegram.
2. Gửi lệnh `/newapp`.
3. Chọn bot Telegram của bạn.
4. Đặt tên hiển thị cho Mini App (Ví dụ: `Pokémon Card Battle`).
5. Nhập mô tả ngắn gọn cho App.
6. Tải lên ảnh đại diện hoặc GIF demo (kích thước 640x360).
7. Khi BotFather yêu cầu URL của Web App, dán đường dẫn:
   ```text
   https://hanhk112023-jpg.github.io/pokemon-twa/
   ```
8. Chọn short name cho App (Ví dụ: `game` hoặc `play`).
9. Hoàn tất! Người chơi có thể truy cập qua link dạng: `https://t.me/<tên_bot_của_bạn>/game`.

---

## 🛠️ Cấu Trúc Mã Nguồn

```text
pokemon-twa/
├── index.html                 # Giao diện chính Single-Page Application
├── css/
│   └── style.css              # Hiệu ứng 3D perspective, holo foil shimmer, animations
├── js/
│   ├── data.js                # Danh mục 40+ Pokémon, Gym Leaders, Bảng tương khắc hệ
│   ├── audio.js               # Bộ tổng hợp âm thanh Retro 8-bit Web Audio API
│   ├── gacha.js               # Logic quay thẻ bài, xé gói 3D & lật bài
│   ├── battle.js              # Động cơ chiến đấu theo lượt & tính toán sát thương
│   └── app.js                 # Quản lý trạng thái, LocalStorage & Telegram SDK
├── .github/workflows/
│   └── deploy-pages.yml       # Tự động triển khai lên GitHub Pages
└── README.md
```
