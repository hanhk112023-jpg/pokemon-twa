/**
 * Pokémon Card Master Database & Elemental Matrix
 * High-res official artwork from PokeAPI GitHub repository
 */

const POKEMON_DATA = [
  // --- GENERATION 1 ---
  {
    id: 25,
    name: "Pikachu",
    title: "Chuột Điện Quán Quân",
    type: "electric",
    rarity: "rare",
    hp: 420,
    maxHp: 420,
    atk: 88,
    def: 55,
    spd: 110,
    moves: [
      { name: "Tia Điện (Quick Spark)", power: 45, energy: 0, type: "electric" },
      { name: "Sấm Sét 10 Vạn Volt (Volt Tackle)", power: 125, energy: 2, type: "electric", effect: "crit_chance" }
    ],
    flavor: "Khi tức giận, điện tích tích tụ trong hai túi má đỏ rực sẽ phóng ra những tia sét khổng lồ."
  },
  {
    id: 6,
    name: "Charizard",
    title: "Rồng Lửa Bạo Chúa",
    type: "fire",
    rarity: "legendary",
    hp: 680,
    maxHp: 680,
    atk: 135,
    def: 82,
    spd: 100,
    moves: [
      { name: "Cào Lửa (Dragon Claw)", power: 55, energy: 0, type: "fire" },
      { name: "Bão Lửa Thiêu Rụi (Blast Burn)", power: 165, energy: 3, type: "fire", effect: "burn" }
    ],
    flavor: "Lửa ở đuôi bùng cháy dữ dội khi trải qua các trận chiến khốc liệt. Hơi thở lửa nung chảy cả đá tảng."
  },
  {
    id: 9,
    name: "Blastoise",
    title: "Pháo Thủ Mai Rùa",
    type: "water",
    rarity: "epic",
    hp: 720,
    maxHp: 720,
    atk: 95,
    def: 130,
    spd: 78,
    moves: [
      { name: "Húc Mai Rùa (Aqua Tail)", power: 50, energy: 0, type: "water" },
      { name: "Đại Bác Áp Lực Nước (Hydro Cannon)", power: 145, energy: 2, type: "water", effect: "shield" }
    ],
    flavor: "Hai nòng pháo trên mai rùa có thể bắn ra những tia nước áp lực cực mạnh xuyên thủng thép dày."
  },
  {
    id: 3,
    name: "Venusaur",
    title: "Thần Thảo Rừng Xanh",
    type: "grass",
    rarity: "epic",
    hp: 750,
    maxHp: 750,
    atk: 100,
    def: 110,
    spd: 80,
    moves: [
      { name: "Roi Dây Leo (Vine Whip)", power: 52, energy: 0, type: "grass" },
      { name: "Tia Sáng Thái Dương (Solar Beam)", power: 155, energy: 3, type: "grass", effect: "heal" }
    ],
    flavor: "Đóa hoa khổng lồ trên lưng tỏa ra hương thơm dịu mát có khả năng hồi phục năng lượng cho đồng đội."
  },
  {
    id: 94,
    name: "Gengar",
    title: "Bóng Ma Hắc Ám",
    type: "ghost",
    rarity: "epic",
    hp: 550,
    maxHp: 550,
    atk: 140,
    def: 65,
    spd: 115,
    moves: [
      { name: "Đấm Bóng Đêm (Shadow Punch)", power: 58, energy: 0, type: "ghost" },
      { name: "Ác Mộng Hút Hồn (Shadow Ball)", power: 150, energy: 2, type: "ghost", effect: "stun" }
    ],
    flavor: "Ẩn mình trong bóng tối dưới chân nạn nhân. Khi nhiệt độ xung quanh giảm đột ngột, Gengar đang ở gần."
  },
  {
    id: 150,
    name: "Mewtwo",
    title: "Chiến Binh Nhân Bản Tối Thượng",
    type: "psychic",
    rarity: "mythic",
    hp: 850,
    maxHp: 850,
    atk: 175,
    def: 95,
    spd: 130,
    moves: [
      { name: "Sóng Siêu Linh (Psycho Cut)", power: 75, energy: 0, type: "psychic" },
      { name: "Càn Quét Tinh Thần (Psystrike)", power: 210, energy: 3, type: "psychic", effect: "crit_chance" }
    ],
    flavor: "Được tạo ra từ DNA của Mew bởi các nhà khoa học. Sức mạnh tâm linh tối thượng vượt qua mọi sinh vật."
  },
  {
    id: 151,
    name: "Mew",
    title: "Cội Nguồn Bí Ẩn",
    type: "psychic",
    rarity: "mythic",
    hp: 700,
    maxHp: 700,
    atk: 120,
    def: 120,
    spd: 120,
    moves: [
      { name: "Tia Tâm Linh (Psyshock)", power: 60, energy: 0, type: "psychic" },
      { name: "Biến Ảo Vô Tận (Metronome Blast)", power: 170, energy: 2, type: "psychic", effect: "heal" }
    ],
    flavor: "Chứa bộ gen của tất cả Pokémon. Có thể học mọi chiêu thức và tự do tàng hình theo ý muốn."
  },
  {
    id: 149,
    name: "Dragonite",
    title: "Long Vương Biển Cả",
    type: "dragon",
    rarity: "legendary",
    hp: 820,
    maxHp: 820,
    atk: 145,
    def: 105,
    spd: 90,
    moves: [
      { name: "Long Nộ (Dragon Tail)", power: 62, energy: 0, type: "dragon" },
      { name: "Hơi Thở Rồng Thần (Outrage)", power: 180, energy: 3, type: "dragon", effect: "crit_chance" }
    ],
    flavor: "Thân hình to lớn nhưng có thể bay vòng quanh trái đất chỉ trong 16 giờ. Tính tình nhân từ hay cứu người gặp nạn."
  },
  {
    id: 130,
    name: "Gyarados",
    title: "Thủy Quái Cuồng Nộ",
    type: "water",
    rarity: "rare",
    hp: 650,
    maxHp: 650,
    atk: 130,
    def: 85,
    spd: 85,
    moves: [
      { name: "Đập Đuôi Thủy Triều (Aqua Tail)", power: 55, energy: 0, type: "water" },
      { name: "Cơn Thịnh Nộ Đại Dương (Hydro Pump)", power: 140, energy: 2, type: "water", effect: "burn" }
    ],
    flavor: "Tiến hóa từ cá chép Magikarp tầm thường. Khi thức tỉnh cơn cuồng nộ có thể cuốn trôi cả một ngôi làng."
  },
  {
    id: 143,
    name: "Snorlax",
    title: "Khổng Lồ Ngủ Say",
    type: "normal",
    rarity: "rare",
    hp: 980,
    maxHp: 980,
    atk: 110,
    def: 125,
    spd: 40,
    moves: [
      { name: "Đè Bẹp (Body Slam)", power: 50, energy: 0, type: "normal" },
      { name: "Đại Lực Đột Kích (Giga Impact)", power: 150, energy: 2, type: "normal", effect: "heal" }
    ],
    flavor: "Mỗi ngày ăn 400kg thức ăn rồi đi ngủ. Dạ dày tiêu hóa được cả các chất độc nguy hiểm nhất."
  },
  {
    id: 65,
    name: "Alakazam",
    title: "Bậc Thầy Trí Não",
    type: "psychic",
    rarity: "rare",
    hp: 460,
    maxHp: 460,
    atk: 145,
    def: 55,
    spd: 125,
    moves: [
      { name: "Bẻ Cong Muỗng (Psybeam)", power: 50, energy: 0, type: "psychic" },
      { name: "Ý Chí Vũ Trụ (Psychic)", power: 140, energy: 2, type: "psychic", effect: "stun" }
    ],
    flavor: "Chỉ số IQ vượt hơn 5.000. Não bộ không ngừng ghi nhớ mọi sự kiện từ khi mới sinh ra."
  },
  {
    id: 68,
    name: "Machamp",
    title: "Võ Thần Tứ Thủ",
    type: "fighting",
    rarity: "rare",
    hp: 680,
    maxHp: 680,
    atk: 135,
    def: 85,
    spd: 65,
    moves: [
      { name: "Võ Sĩ Quyền Anh (Karate Chop)", power: 55, energy: 0, type: "fighting" },
      { name: "Liên Hoàn Nghìn Cú Đấm (Dynamic Punch)", power: 155, energy: 2, type: "fighting", effect: "crit_chance" }
    ],
    flavor: "Có 4 cánh tay rắn chắc phóng ra hơn 1.000 cú đấm uy lực chỉ trong vỏn vẹn hai giây."
  },
  {
    id: 144,
    name: "Articuno",
    title: "Băng Thần Tuyết Sơn",
    type: "ice",
    rarity: "legendary",
    hp: 730,
    maxHp: 730,
    atk: 115,
    def: 120,
    spd: 95,
    moves: [
      { name: "Mảnh Băng Sắc Lạnh (Ice Shard)", power: 54, energy: 0, type: "ice" },
      { name: "Bão Tuyết Đóng Băng (Blizzard)", power: 165, energy: 3, type: "ice", effect: "stun" }
    ],
    flavor: "Loài chim thần thoại sống trên những đỉnh núi băng giá. Đôi cánh lướt qua làm tuyết rơi trắng xóa."
  },
  {
    id: 145,
    name: "Zapdos",
    title: "Lôi Thần Sấm Sét",
    type: "electric",
    rarity: "legendary",
    hp: 720,
    maxHp: 720,
    atk: 135,
    def: 90,
    spd: 110,
    moves: [
      { name: "Tia Lửa Điện (Thunder Shock)", power: 58, energy: 0, type: "electric" },
      { name: "Cuồng Lôi Trừng Phạt (Thunder)", power: 175, energy: 3, type: "electric", effect: "crit_chance" }
    ],
    flavor: "Mỗi khi vỗ cánh sẽ tạo ra những tiếng sấm gầm vang trời và tia chớp giáng xuống đất."
  },
  {
    id: 146,
    name: "Moltres",
    title: "Hỏa Điểu Tái Sinh",
    type: "fire",
    rarity: "legendary",
    hp: 720,
    maxHp: 720,
    atk: 135,
    def: 95,
    spd: 100,
    moves: [
      { name: "Mũi Tên Lửa (Fire Spin)", power: 56, energy: 0, type: "fire" },
      { name: "Phượng Hoàng Lửa (Overheat)", power: 170, energy: 3, type: "fire", effect: "burn" }
    ],
    flavor: "Loài chim phượng hoàng rực lửa. Tương truyền khi tắm trong nham thạch núi lửa sẽ chữa lành mọi vết thương."
  },
  {
    id: 133,
    name: "Eevee",
    title: "Tiềm Năng Đa Hệ",
    type: "normal",
    rarity: "common",
    hp: 360,
    maxHp: 360,
    atk: 60,
    def: 55,
    spd: 65,
    moves: [
      { name: "Húc Đầu Nhanh (Quick Attack)", power: 38, energy: 0, type: "normal" },
      { name: "Ngôi Sao Hy Vọng (Swift)", power: 85, energy: 1, type: "normal", effect: "none" }
    ],
    flavor: "Mã gen di truyền không ổn định giúp Eevee có thể tiến hóa thành 8 hình thái hệ nguyên tố khác nhau."
  },

  // --- GENERATION 2 ---
  {
    id: 249,
    name: "Lugia",
    title: "Hộ Vệ Vực Biển Sâu",
    type: "psychic",
    rarity: "legendary",
    hp: 880,
    maxHp: 880,
    atk: 120,
    def: 140,
    spd: 110,
    moves: [
      { name: "Lốc Biển (Gust)", power: 55, energy: 0, type: "psychic" },
      { name: "Vụ Nổ Không Gian Biển (Aeroblast)", power: 195, energy: 3, type: "psychic", effect: "shield" }
    ],
    flavor: "Người bảo vệ đại dương, ngủ say dưới đáy biển sâu. Chỉ cần vỗ cánh nhẹ cũng tạo nên cơn bão 40 ngày."
  },
  {
    id: 250,
    name: "Ho-Oh",
    title: "Hỏa Phượng Bảy Sắc Cầu Vồng",
    type: "fire",
    rarity: "legendary",
    hp: 870,
    maxHp: 870,
    atk: 135,
    def: 130,
    spd: 100,
    moves: [
      { name: "Tia Lửa Rực Rỡ (Flamethrower)", power: 60, energy: 0, type: "fire" },
      { name: "Thánh Hỏa Tái Sinh (Sacred Fire)", power: 190, energy: 3, type: "fire", effect: "heal" }
    ],
    flavor: "Bay lượn trên bầu trời để lại vệt sáng cầu vồng rực rỡ. Ban phước lành hạnh phúc vĩnh cửu cho ai nhìn thấy."
  },
  {
    id: 248,
    name: "Tyranitar",
    title: "Hắc Bạo Chúa Sa Mạc",
    type: "rock",
    rarity: "epic",
    hp: 780,
    maxHp: 780,
    atk: 145,
    def: 115,
    spd: 65,
    moves: [
      { name: "Cắn Xé Đêm Tối (Crunch)", power: 60, energy: 0, type: "dark" },
      { name: "Bão Cát Địa Chấn (Stone Edge)", power: 160, energy: 2, type: "rock", effect: "shield" }
    ],
    flavor: "Lớp vỏ đá cứng như giáp bọc thép. Cơn giận của nó có thể làm sụp đổ cả ngọn núi hùng vĩ."
  },
  {
    id: 212,
    name: "Scizor",
    title: "Hiệp Sĩ Thiết Giáp",
    type: "steel",
    rarity: "rare",
    hp: 580,
    maxHp: 580,
    atk: 140,
    def: 110,
    spd: 75,
    moves: [
      { name: "Song Đao Sắt (Bullet Punch)", power: 55, energy: 0, type: "steel" },
      { name: "Càng Kẹp Sát Thủ (X-Scissor)", power: 145, energy: 2, type: "bug", effect: "crit_chance" }
    ],
    flavor: "Hai chiếc càng chứa thép siêu cứng nghiền nát mọi chướng ngại vật thành bột mịn."
  },

  // --- GENERATION 3 ---
  {
    id: 384,
    name: "Rayquaza",
    title: "Hoàng Đế Tầng Bình Lưu",
    type: "dragon",
    rarity: "mythic",
    hp: 880,
    maxHp: 880,
    atk: 180,
    def: 95,
    spd: 120,
    moves: [
      { name: "Đao Gió Long Thần (Air Slash)", power: 65, energy: 0, type: "flying" },
      { name: "Thăng Long Thần Khí (Dragon Ascent)", power: 220, energy: 3, type: "dragon", effect: "crit_chance" }
    ],
    flavor: "Sinh sống hàng triệu năm trên tầng ozone hấp thụ các mảnh thiên thạch. Kẻ định đoạt hòa bình nhân loại."
  },
  {
    id: 382,
    name: "Kyogre",
    title: "Chúa Tể Thủy Triều",
    type: "water",
    rarity: "legendary",
    hp: 850,
    maxHp: 850,
    atk: 145,
    def: 125,
    spd: 95,
    moves: [
      { name: "Sóng Thần (Water Pulse)", power: 60, energy: 0, type: "water" },
      { name: "Cội Nguồn Sóng Biển (Origin Pulse)", power: 195, energy: 3, type: "water", effect: "burn" }
    ],
    flavor: "Thần thoại ngự trị biển cả, người đã mở rộng đại dương bằng những cơn mưa tầm tã bất tận."
  },
  {
    id: 383,
    name: "Groudon",
    title: "Chúa Tể Đại Lục",
    type: "ground",
    rarity: "legendary",
    hp: 860,
    maxHp: 860,
    atk: 155,
    def: 135,
    spd: 90,
    moves: [
      { name: "Nứt Đất (Mud Shot)", power: 60, energy: 0, type: "ground" },
      { name: "Thanh Kiếm Nhai Bột (Precipice Blades)", power: 200, energy: 3, type: "ground", effect: "shield" }
    ],
    flavor: "Đại diện cho đất mẹ màu mỡ, từng thổi bùng ánh nắng làm bốc hơi biển để kiến tạo nên các lục địa."
  },
  {
    id: 257,
    name: "Blaziken",
    title: "Vua Túc Cầu Hỏa Liệt",
    type: "fire",
    rarity: "epic",
    hp: 630,
    maxHp: 630,
    atk: 135,
    def: 75,
    spd: 95,
    moves: [
      { name: "Cú Đá Hỏa Tiễn (Flame Charge)", power: 55, energy: 0, type: "fire" },
      { name: "Cuồng Nộ Túc Cầu (Brave Bird)", power: 155, energy: 2, type: "flying", effect: "crit_chance" }
    ],
    flavor: "Bật nhảy qua cả tòa nhà cao ốc 30 tầng và tung ra những cú đá rực lửa xé rách màn đêm."
  },
  {
    id: 282,
    name: "Gardevoir",
    title: "Vũ Nữ Tâm Linh Tận Tụy",
    type: "psychic",
    rarity: "epic",
    hp: 600,
    maxHp: 600,
    atk: 130,
    def: 85,
    spd: 90,
    moves: [
      { name: "Ánh Sao Nguyện Cầu (Moonblast)", power: 58, energy: 0, type: "fairy" },
      { name: "Hố Đen Tâm Linh (Psychic Singularity)", power: 160, energy: 2, type: "psychic", effect: "shield" }
    ],
    flavor: "Có khả năng nhìn thấu tương lai và sẵn sàng tạo ra một hố đen vũ trụ để bảo vệ Huấn luyện viên."
  },

  // --- GENERATION 4 & BEYOND ---
  {
    id: 448,
    name: "Lucario",
    title: "Chiến Thần Tinh Thần Lực (Aura)",
    type: "fighting",
    rarity: "legendary",
    hp: 620,
    maxHp: 620,
    atk: 145,
    def: 75,
    spd: 105,
    moves: [
      { name: "Quyền Phong Tinh Thần (Force Palm)", power: 60, energy: 0, type: "fighting" },
      { name: "Cầu Năng Lượng Aura (Aura Sphere)", power: 180, energy: 3, type: "fighting", effect: "crit_chance" }
    ],
    flavor: "Đọc thấu suy nghĩ và cảm xúc của đối thủ qua sóng Aura. Cầu năng lượng Aura không bao giờ trượt mục tiêu."
  },
  {
    id: 445,
    name: "Garchomp",
    title: "Thần Cá Mập Đất Long Vương",
    type: "dragon",
    rarity: "epic",
    hp: 790,
    maxHp: 790,
    atk: 140,
    def: 95,
    spd: 110,
    moves: [
      { name: "Móng Vuốt Long Thần (Dragon Claw)", power: 60, energy: 0, type: "dragon" },
      { name: "Động Đất San Bằng (Earthquake)", power: 165, energy: 2, type: "ground", effect: "crit_chance" }
    ],
    flavor: "Lướt trên không trung với tốc độ âm thanh sánh ngang máy bay tiêm kích phản lực."
  },
  {
    id: 483,
    name: "Dialga",
    title: "Chúa Tể Thời Gian",
    type: "steel",
    rarity: "mythic",
    hp: 890,
    maxHp: 890,
    atk: 160,
    def: 130,
    spd: 90,
    moves: [
      { name: "Mũi Giáo Kim Loại (Metal Claw)", power: 65, energy: 0, type: "steel" },
      { name: "Tiếng Gầm Thời Gian (Roar of Time)", power: 220, energy: 3, type: "dragon", effect: "stun" }
    ],
    flavor: "Thời gian bắt đầu chuyển động khi Dialga được sinh ra. Có quyền năng kiểm soát dòng chảy quá khứ và tương lai."
  },
  {
    id: 484,
    name: "Palkia",
    title: "Chúa Tể Không Gian",
    type: "water",
    rarity: "mythic",
    hp: 880,
    maxHp: 880,
    atk: 160,
    def: 125,
    spd: 105,
    moves: [
      { name: "Thủy Cầu Áp Suất (Water Pulse)", power: 65, energy: 0, type: "water" },
      { name: "Xé Rách Không Gian (Spacial Rend)", power: 220, energy: 3, type: "dragon", effect: "crit_chance" }
    ],
    flavor: "Ngự trị tại khe nứt không gian song song. Mỗi hơi thở của nó ổn định trật tự cấu trúc vũ trụ."
  },
  {
    id: 487,
    name: "Giratina",
    title: "Bá Chủ Thế Giới Đảo Ngược",
    type: "ghost",
    rarity: "mythic",
    hp: 950,
    maxHp: 950,
    atk: 155,
    def: 140,
    spd: 90,
    moves: [
      { name: "Bóng Ma U Ám (Shadow Sneak)", power: 60, energy: 0, type: "ghost" },
      { name: "Tuyệt Kỹ Đảo Chiều (Shadow Force)", power: 215, energy: 3, type: "ghost", effect: "shield" }
    ],
    flavor: "Bị trục xuất vì tính bạo lực sang Thế giới Đảo ngược, nơi quy luật vật lý và trọng lực không tồn tại."
  },
  {
    id: 493,
    name: "Arceus",
    title: "Đấng Sáng Tạo Vạn Vật",
    type: "normal",
    rarity: "mythic",
    hp: 1000,
    maxHp: 1000,
    atk: 180,
    def: 160,
    spd: 130,
    moves: [
      { name: "Ánh Sáng Thánh Khởi (Judgment Spike)", power: 75, energy: 0, type: "normal" },
      { name: "Phán Quyết Khai Thiên (Judgment)", power: 250, energy: 3, type: "normal", effect: "crit_chance" }
    ],
    flavor: "Đản sinh từ hư vô trước khi vũ trụ hình thành. Đã dùng một nghìn cánh tay để tạo dựng nên thế giới."
  },
  {
    id: 658,
    name: "Greninja",
    title: "Nhẫn Giả Thủy Long",
    type: "water",
    rarity: "legendary",
    hp: 630,
    maxHp: 630,
    atk: 140,
    def: 70,
    spd: 135,
    moves: [
      { name: "Ám Khí Băng Giá (Water Pulse)", power: 60, energy: 0, type: "water" },
      { name: "Phi Tiêu Nước Xoáy (Water Shuriken)", power: 175, energy: 3, type: "water", effect: "crit_chance" }
    ],
    flavor: "Di chuyển thoắt ẩn thoắt hiện như một ninja thực thụ. Nén nước thành những phi tiêu sắc bén chém đứt kim loại."
  },

  // --- COMMON POKEMON POOL ---
  {
    id: 1,
    name: "Bulbasaur",
    title: "Hạt Mầm Xanh",
    type: "grass",
    rarity: "common",
    hp: 380,
    maxHp: 380,
    atk: 55,
    def: 55,
    spd: 50,
    moves: [
      { name: "Tacke", power: 35, energy: 0, type: "normal" },
      { name: "Dây Leo (Vine Whip)", power: 75, energy: 1, type: "grass", effect: "none" }
    ],
    flavor: "Hạt mầm trên lưng lớn dần theo thời gian khi hấp thụ ánh sáng mặt trời."
  },
  {
    id: 4,
    name: "Charmander",
    title: "Rồng Lửa Nhỏ",
    type: "fire",
    rarity: "common",
    hp: 360,
    maxHp: 360,
    atk: 60,
    def: 45,
    spd: 65,
    moves: [
      { name: "Cào (Scratch)", power: 36, energy: 0, type: "normal" },
      { name: "Tia Lửa (Ember)", power: 80, energy: 1, type: "fire", effect: "none" }
    ],
    flavor: "Ngọn lửa ở chóp đuôi thể hiện sức sống của Charmander. Lửa tắt là lúc sinh mệnh kết thúc."
  },
  {
    id: 7,
    name: "Squirtle",
    title: "Rùa Nước Tinh Nghịch",
    type: "water",
    rarity: "common",
    hp: 400,
    maxHp: 400,
    atk: 50,
    def: 70,
    spd: 45,
    moves: [
      { name: "Húc Mai (Tackle)", power: 35, energy: 0, type: "normal" },
      { name: "Bắn Nước (Water Gun)", power: 75, energy: 1, type: "water", effect: "none" }
    ],
    flavor: "Khi bị tấn công, Squirtle rụt đầu và tứ chi vào mai rồi phun nước bọt áp lực cao phản kích."
  },
  {
    id: 16,
    name: "Pidgey",
    title: "Chim Nhỏ Đồng Cỏ",
    type: "flying",
    rarity: "common",
    hp: 340,
    maxHp: 340,
    atk: 48,
    def: 42,
    spd: 60,
    moves: [
      { name: "Mổ (Peck)", power: 34, energy: 0, type: "flying" },
      { name: "Gió Cuốn (Gust)", power: 70, energy: 1, type: "flying", effect: "none" }
    ],
    flavor: "Có khứu giác phương hướng cực kỳ nhạy bén, luôn tìm được đường về tổ dù ở khoảng cách xa xôi."
  },
  {
    id: 74,
    name: "Geodude",
    title: "Hòn Đá Lăn",
    type: "rock",
    rarity: "common",
    hp: 420,
    maxHp: 420,
    atk: 65,
    def: 85,
    spd: 30,
    moves: [
      { name: "Húc Đá (Tackle)", power: 36, energy: 0, type: "normal" },
      { name: "Ném Đá Tảng (Rock Throw)", power: 78, energy: 1, type: "rock", effect: "none" }
    ],
    flavor: "Tự hào với cơ thể rắn như đá hoa cương, thường dùng hai tay leo trèo trên những vách núi hiểm trở."
  },
  {
    id: 92,
    name: "Gastly",
    title: "Làn Khói Khí Độc",
    type: "ghost",
    rarity: "common",
    hp: 320,
    maxHp: 320,
    atk: 68,
    def: 35,
    spd: 80,
    moves: [
      { name: "Liếm Lưỡi (Lick)", power: 35, energy: 0, type: "ghost" },
      { name: "Khí Độc Tử Thần (Smog)", power: 76, energy: 1, type: "poison", effect: "none" }
    ],
    flavor: "Cơ thể cấu tạo từ 95% chất khí độc hại. Có thể luồn lách qua bất kỳ khe hở kín nào."
  }
];

// --- ELEMENTAL TYPES MATRIX ---
// Multipliers: 2.0 = Super Effective, 0.5 = Not Very Effective, 1.0 = Normal
const TYPE_CHART = {
  normal:   { rock: 0.5, ghost: 0, steel: 0.5 },
  fire:     { fire: 0.5, water: 0.5, grass: 2.0, ice: 2.0, bug: 2.0, rock: 0.5, dragon: 0.5, steel: 2.0 },
  water:    { fire: 2.0, water: 0.5, grass: 0.5, ground: 2.0, rock: 2.0, dragon: 0.5 },
  grass:    { fire: 0.5, water: 2.0, grass: 0.5, poison: 0.5, ground: 2.0, flying: 0.5, bug: 0.5, rock: 2.0, dragon: 0.5, steel: 0.5 },
  electric: { water: 2.0, electric: 0.5, grass: 0.5, ground: 0, flying: 2.0, dragon: 0.5 },
  ice:      { fire: 0.5, water: 0.5, grass: 2.0, ice: 0.5, ground: 2.0, flying: 2.0, dragon: 2.0, steel: 0.5 },
  fighting: { normal: 2.0, ice: 2.0, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2.0, ghost: 0, dark: 2.0, steel: 2.0, fairy: 0.5 },
  poison:   { grass: 2.0, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2.0 },
  ground:   { fire: 2.0, electric: 2.0, grass: 0.5, poison: 2.0, flying: 0, bug: 0.5, rock: 2.0, steel: 2.0 },
  flying:   { electric: 0.5, grass: 2.0, fighting: 2.0, bug: 2.0, rock: 0.5, steel: 0.5 },
  psychic:  { fighting: 2.0, poison: 2.0, psychic: 0.5, steel: 0.5, dark: 0 },
  bug:      { fire: 0.5, grass: 2.0, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2.0, ghost: 0.5, dark: 2.0, steel: 0.5, fairy: 0.5 },
  rock:     { fire: 2.0, ice: 2.0, fighting: 0.5, ground: 0.5, flying: 2.0, bug: 2.0, steel: 0.5 },
  ghost:    { normal: 0, psychic: 2.0, ghost: 2.0, dark: 0.5 },
  dragon:   { dragon: 2.0, steel: 0.5, fairy: 0 },
  steel:    { fire: 0.5, water: 0.5, electric: 0.5, ice: 2.0, rock: 2.0, steel: 0.5, fairy: 2.0 },
  dark:     { fighting: 0.5, psychic: 2.0, ghost: 2.0, dark: 0.5, fairy: 0.5 },
  fairy:    { fire: 0.5, fighting: 2.0, poison: 0.5, dragon: 2.0, steel: 0.5 }
};

// --- PACK DEFINITIONS ---
const BOOSTER_PACKS = [
  {
    id: "poke_pack",
    name: "Poké Pack Tiêu Chuẩn",
    tag: "Khởi Đầu",
    cost: 100,
    cardCount: 4,
    color: "from-blue-600 via-indigo-600 to-blue-800",
    border: "border-blue-400/40",
    rates: { common: 0.65, rare: 0.25, epic: 0.08, legendary: 0.02, mythic: 0.00 }
  },
  {
    id: "great_pack",
    name: "Great Pack Chiến Binh",
    tag: "Đảm bảo 1 Hiếm+",
    cost: 250,
    cardCount: 5,
    color: "from-purple-600 via-fuchsia-600 to-indigo-900",
    border: "border-purple-400/50",
    rates: { common: 0.40, rare: 0.40, epic: 0.15, legendary: 0.04, mythic: 0.01 }
  },
  {
    id: "master_pack",
    name: "Master Mythic Huyền Thoại",
    tag: "Tỷ lệ Vàng",
    cost: 500,
    cardCount: 5,
    color: "from-amber-500 via-rose-600 to-purple-900",
    border: "border-amber-400/70",
    rates: { common: 0.15, rare: 0.35, epic: 0.30, legendary: 0.15, mythic: 0.05 }
  }
];

// --- GYM LEADERS & OPPONENTS ---
const GYM_LEADERS = [
  {
    id: "wild_battle",
    name: "Bụi Cỏ Hoang Dã",
    trainerTitle: "Pokémon Hoang Dã",
    avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png",
    rewardCoins: 50,
    rewardExp: 35,
    difficulty: "Dễ",
    pokemon: 133 // Eevee or random
  },
  {
    id: "brock",
    name: "Thủ Lĩnh Brock",
    trainerTitle: "Nhà Thi Đấu Pewter",
    avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/74.png",
    rewardCoins: 120,
    rewardExp: 80,
    difficulty: "Trung Bình",
    pokemon: 74 // Geodude
  },
  {
    id: "misty",
    name: "Thủ Lĩnh Misty",
    trainerTitle: "Nhà Thi Đấu Cerulean",
    avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
    rewardCoins: 200,
    rewardExp: 140,
    difficulty: "Khó",
    pokemon: 9 // Blastoise
  },
  {
    id: "lt_surge",
    name: "Thủ Lĩnh Lt. Surge",
    trainerTitle: "Nhà Thi Đấu Vermilion",
    avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    rewardCoins: 280,
    rewardExp: 200,
    difficulty: "Khó",
    pokemon: 25 // Pikachu
  },
  {
    id: "giovanni",
    name: "Trùm Băng Rocket Giovanni",
    trainerTitle: "Nhà Thi Đấu Viridian",
    avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/248.png",
    rewardCoins: 400,
    rewardExp: 320,
    difficulty: "Cực Khó",
    pokemon: 248 // Tyranitar
  },
  {
    id: "champion_red",
    name: "Quán Quân Red",
    trainerTitle: "Đỉnh Núi Silver",
    avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    rewardCoins: 650,
    rewardExp: 500,
    difficulty: "Huyền Thoại",
    pokemon: 6 // Charizard / Mewtwo
  }
];

// Helper: Get Official Pokémon Artwork URL
function getPokemonImage(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
