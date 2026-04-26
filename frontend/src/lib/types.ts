export interface Song {
  id: string;
  title: string;
  artist: string;
  artistId?: string;
  album?: string;
  albumId?: string;
  cover: string;
  duration: string;
  audioUrl?: string; // fallback if needed
  canvasUrl?: string; // Spotify live canvas looping video
  genre?: string;
  plays?: number;
  releaseDate?: string;
  trending?: boolean;
  color?: string; // Dynamic theme accent color
  lyrics?: string;
  isLiked?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  followers: string;
  genre: string;
  monthlyListeners: string;
  verified?: boolean;
  bio?: string;
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  artist: string;
  cover: string;
  year: number;
  genre: string;
  songCount: number;
  duration: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  cover: string;
  songCount: number;
  mood: string;
}

export interface Genre {
  id: string;
  name: string;
  color: string;
  image: string;
}
