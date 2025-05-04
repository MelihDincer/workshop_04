## 🎬 Movie & TV Series Browser App

A single-page React.js application that allows users to search for movies and TV series, add them to a personal watchlist, rate them, and view personalized statistics — all without using any routing. Everything happens dynamically on a single screen.

### 🔧 Features

- 🔍 **Search Movies & Series**  
  Instantly search for any movie or TV series by title using a public movie API.

- ⭐ **Star-Based Rating System**  
  Users can rate titles with an interactive star rating module.

- ➕ **Add to Watchlist**  
  Save selected titles to a personalized watchlist.

- 💾 **Local Storage Persistence**  
  All watchlist items and ratings are stored in `localStorage`, ensuring data is preserved even after refreshing the page.

- 📊 **Dynamic Statistics**  
  Automatically calculates and displays:
  - Total runtime of all added titles
  - Average user rating

- 📄 **Pagination**  
  Displays 20 titles per page for efficient browsing. Users can load additional pages if more results are available.

- 🎨 **Single-Page UI Design**  
  All features — search, watchlist, and stats — are handled on a single page without any routing or navigation.

### 📸 Screenshots

![image](https://github.com/user-attachments/assets/2b1293a9-0bf6-4165-966a-7a19a37d606c)

### 🛠️ Tech Stack

- **Frontend**: ![React](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg) **React.js** 
- **API**: [TMDb API](https://www.themoviedb.org/)
- **State Management**: React Hooks
- **Persistence**: Browser LocalStorage
- **Styling**: ![Bootstrap](https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png) **Bootstrap**  
- **Storage**: ![LocalStorage Icon](https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_Chrome_icon_%282011%29.png) **LocalStorage**  

#### 🚀 Getting Started

1. Clone the repo  
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
