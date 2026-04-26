import { Song, Artist, Album, Playlist, Genre } from './types';

export const artists: Artist[] = [
  {
    id: 'eminem',
    name: 'Eminem',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Eminem_-_Concert_for_Valor_in_Washington%2C_D.C._Nov._11%2C_2014_%2815181673105%29.jpg/800px-Eminem_-_Concert_for_Valor_in_Washington%2C_D.C._Nov._11%2C_2014_%2815181673105%29.jpg',
    followers: '56.2M',
    genre: 'Hip-Hop',
    monthlyListeners: '45.1M',
    verified: true,
    bio: 'Marshall Bruce Mathers III, known professionally as Eminem, is an American rapper, songwriter, and record producer.',
  },
  {
    id: 'billie-eilish',
    name: 'Billie Eilish',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Billie_Eilish_2019.png/800px-Billie_Eilish_2019.png',
    followers: '42.1M',
    genre: 'Pop / Alternative',
    monthlyListeners: '60.3M',
    verified: true,
    bio: 'Billie Eilish Pirate Baird O\'Connell is an American singer and songwriter.',
  },
  {
    id: 'adele',
    name: 'Adele',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Adele_2016.jpg/800px-Adele_2016.jpg',
    followers: '38.7M',
    genre: 'Pop / Soul',
    monthlyListeners: '52.8M',
    verified: true,
  },
  {
    id: 'lana-del-rey',
    name: 'Lana Del Rey',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Lana_Del_Rey_Billboard_Music_Awards_2018.png/800px-Lana_Del_Rey_Billboard_Music_Awards_2018.png',
    followers: '34.5M',
    genre: 'Indie Pop',
    monthlyListeners: '41.2M',
    verified: true,
  },
  {
    id: 'drake',
    name: 'Drake',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Drake_July_2016.jpg/800px-Drake_July_2016.jpg',
    followers: '51.3M',
    genre: 'Hip-Hop / R&B',
    monthlyListeners: '58.7M',
    verified: true,
  },
  {
    id: 'the-weeknd',
    name: 'The Weeknd',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/The_Weeknd_2022.png/800px-The_Weeknd_2022.png',
    followers: '47.8M',
    genre: 'R&B / Pop',
    monthlyListeners: '73.1M',
    verified: true,
  },
  {
    id: 'taylor-swift',
    name: 'Taylor Swift',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png/800px-191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png',
    followers: '89.2M',
    genre: 'Pop / Country',
    monthlyListeners: '82.4M',
    verified: true,
  },
  {
    id: 'imagine-dragons',
    name: 'Imagine Dragons',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Imagine_Dragons_at_the_2018_iHeartRadio_Music_Festival.jpg/800px-Imagine_Dragons_at_the_2018_iHeartRadio_Music_Festival.jpg',
    followers: '29.4M',
    genre: 'Alternative Rock',
    monthlyListeners: '35.6M',
    verified: true,
  },
];

export const songs: Song[] = [
  {
    id: '1',
    title: 'Without Me',
    artist: 'Eminem',
    artistId: 'eminem',
    album: 'The Eminem Show',
    albumId: 'eminem-show',
    duration: '4:50',
    cover: 'https://upload.wikimedia.org/wikipedia/en/3/35/EminemsTheEminemShow.png',
    genre: 'Hip-Hop',
    plays: 1200000,
    releaseDate: '2002-05-14',
    trending: true,
    color: '#8B0000', // Deep red
  },
  {
    id: '2',
    title: 'Lose Yourself',
    artist: 'Eminem',
    album: '8 Mile (Music from and Inspired By the Motion Picture)',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop', // generic rap cover
    canvasUrl: 'https://cdn.pixabay.com/video/2019/04/10/22646-330058474_large.mp4', // Epic driving night video loop
    duration: '5:26',
    audioUrl: '',
    color: '#1a1f24',
    isLiked: false,
    lyrics: `[00:00.00] Look, if you had one shot or one opportunity
[00:04.50] To seize everything you ever wanted in one moment
[00:08.50] Would you capture it, or just let it slip?
[00:11.80] Yo
[00:13.10] His palms are sweaty, knees weak, arms are heavy
[00:16.20] There's vomit on his sweater already, mom's spaghetti
[00:19.40] He's nervous, but on the surface he looks calm and ready
[00:22.50] To drop bombs, but he keeps on forgetting
[00:25.50] What he wrote down, the whole crowd goes so loud
[00:28.60] He opens his mouth, but the words won't come out
[00:31.70] He's choking, how? Everybody's joking now
[00:34.90] The clock's run out, time's up, over, blaow!
[00:38.00] Snap back to reality, ope there goes gravity
[00:41.00] Ope, there goes Rabbit, he choked
[00:43.00] He's so mad, but he won't give up that easy? No
[00:46.00] He won't have it, he knows his whole back's to these ropes
[00:49.50] It don't matter, he's dope, he knows that, but he's broke
[00:52.50] He's so stagnant, he knows, when he goes back to this mobile home, that's when it's
[00:57.00] Back to the lab again yo, this whole rhapsody
[01:00.50] Better go capture this moment and hope it don't pass him
[01:03.50] You better lose yourself in the music, the moment
[01:06.50] You own it, you better never let it go
[01:09.50] You only get one shot, do not miss your chance to blow
[01:13.00] This opportunity comes once in a lifetime
[01:16.00] You better lose yourself in the music, the moment
[01:19.40] You own it, you better never let it go
[01:22.40] You only get one shot, do not miss your chance to blow
[01:25.60] This opportunity comes once in a lifetime
[01:28.00] You better...`
  },
  {
    id: '3',
    title: 'Bad Guy',
    artist: 'Billie Eilish',
    artistId: 'billie-eilish',
    album: 'When We All Fall Asleep',
    albumId: 'wwafa',
    duration: '3:14',
    cover: 'https://upload.wikimedia.org/wikipedia/en/3/3a/Billie_Eilish_-_When_We_All_Fall_Asleep%2C_Where_Do_We_Go%3F.png',
    genre: 'Pop',
    plays: 3100000,
    releaseDate: '2019-03-29',
    trending: true,
  },
  {
    id: '4',
    title: 'As It Was',
    artist: 'Harry Styles',
    artistId: 'harry-styles',
    album: "Harry's House",
    albumId: 'harrys-house',
    duration: '2:37',
    cover: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Harry_Styles_-_As_It_Was.png/220px-Harry_Styles_-_As_It_Was.png',
    genre: 'Pop',
    plays: 4200000,
    releaseDate: '2022-04-01',
    trending: true,
    color: '#D4AF37', // Gold
  },
  {
    id: '5',
    title: 'Another Love',
    artist: 'Tom Odell',
    artistId: 'tom-odell',
    album: 'Long Way Down',
    albumId: 'long-way-down',
    duration: '3:58',
    cover: 'https://upload.wikimedia.org/wikipedia/en/a/a8/Tom_Odell_-_Long_Way_Down.jpg',
    genre: 'Indie',
    plays: 1800000,
    releaseDate: '2013-06-24',
  },
  {
    id: '6',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    artistId: 'the-weeknd',
    album: 'After Hours',
    albumId: 'after-hours',
    duration: '3:20',
    cover: 'https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_After_Hours.png',
    genre: 'Synth-pop',
    plays: 5600000,
    releaseDate: '2019-11-29',
    trending: true,
    color: '#ff0000', // Red
  },
  {
    id: '7',
    title: 'Cleaning Out My Closet',
    artist: 'Eminem',
    artistId: 'eminem',
    album: 'The Eminem Show',
    albumId: 'eminem-show',
    duration: '4:57',
    cover: 'https://upload.wikimedia.org/wikipedia/en/3/35/EminemsTheEminemShow.png',
    genre: 'Hip-Hop',
    plays: 980000,
    releaseDate: '2002-07-30',
  },
  {
    id: '8',
    title: 'White America',
    artist: 'Eminem',
    artistId: 'eminem',
    album: 'The Eminem Show',
    albumId: 'eminem-show',
    duration: '5:23',
    cover: 'https://upload.wikimedia.org/wikipedia/en/3/35/EminemsTheEminemShow.png',
    genre: 'Hip-Hop',
    plays: 760000,
    releaseDate: '2002-05-14',
  },
  {
    id: '9',
    title: 'Superhero',
    artist: 'Metro Boomin',
    artistId: 'metro-boomin',
    album: 'Heroes & Villains',
    albumId: 'heroes-villains',
    duration: '3:38',
    cover: 'https://upload.wikimedia.org/wikipedia/en/4/41/Heroes_%26_Villains_%28Metro_Boomin_album%29.png',
    genre: 'Hip-Hop',
    plays: 1340000,
    releaseDate: '2022-12-02',
    trending: true,
  },
  {
    id: '10',
    title: 'Unholy',
    artist: 'Sam Smith',
    artistId: 'sam-smith',
    album: 'Gloria',
    albumId: 'gloria',
    duration: '2:36',
    cover: 'https://upload.wikimedia.org/wikipedia/en/9/9c/Sam_Smith_-_Gloria.jpg',
    genre: 'Pop',
    plays: 2800000,
    releaseDate: '2022-09-22',
    trending: true,
  },
  {
    id: '11',
    title: 'Mockingbird',
    artist: 'Eminem',
    artistId: 'eminem',
    album: 'Encore',
    albumId: 'encore',
    duration: '4:10',
    cover: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Eminem-encorealbumcover.jpg/220px-Eminem-encorealbumcover.jpg',
    genre: 'Hip-Hop',
    plays: 1650000,
    releaseDate: '2004-11-12',
  },
  {
    id: '12',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    artistId: 'ed-sheeran',
    album: '÷ (Divide)',
    albumId: 'divide',
    duration: '3:53',
    cover: 'https://upload.wikimedia.org/wikipedia/en/f/ff/Ed_Sheeran_-_Shape_of_You_%28Official_Single_Cover%29.png',
    genre: 'Pop',
    plays: 6200000,
    releaseDate: '2017-01-06',
    trending: true,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/18/audio_31c2730ebb.mp3?filename=lofi-study-112191.mp3', // Free royalty lofi
    color: '#00BFFF', // Light blue
  },
];

export const albums: Album[] = [
  {
    id: 'eminem-show',
    title: 'The Eminem Show',
    artistId: 'eminem',
    artist: 'Eminem',
    cover: 'https://upload.wikimedia.org/wikipedia/en/3/35/EminemsTheEminemShow.png',
    year: 2002,
    genre: 'Hip-Hop',
    songCount: 20,
    duration: '1h 17m',
  },
  {
    id: 'harrys-house',
    title: "Harry's House",
    artistId: 'harry-styles',
    artist: 'Harry Styles',
    cover: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Harry_Styles_-_As_It_Was.png/220px-Harry_Styles_-_As_It_Was.png',
    year: 2022,
    genre: 'Pop',
    songCount: 13,
    duration: '42m',
  },
  {
    id: 'born-to-die',
    title: 'Born To Die',
    artistId: 'lana-del-rey',
    artist: 'Lana Del Rey',
    cover: 'https://upload.wikimedia.org/wikipedia/en/f/f0/Lana_Del_Rey_-_Born_to_Die.jpg',
    year: 2012,
    genre: 'Indie Pop',
    songCount: 15,
    duration: '51m',
  },
  {
    id: 'scorpion',
    title: 'Scorpion',
    artistId: 'drake',
    artist: 'Drake',
    cover: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Drake_Scorpion_album_cover.jpg',
    year: 2018,
    genre: 'Hip-Hop',
    songCount: 25,
    duration: '1h 29m',
  },
  {
    id: 'wwafa',
    title: 'When We All Fall Asleep',
    artistId: 'billie-eilish',
    artist: 'Billie Eilish',
    cover: 'https://upload.wikimedia.org/wikipedia/en/3/3a/Billie_Eilish_-_When_We_All_Fall_Asleep%2C_Where_Do_We_Go%3F.png',
    year: 2019,
    genre: 'Pop',
    songCount: 14,
    duration: '42m',
  },
  {
    id: 'eminem-show-2',
    title: 'Eminem Show 2',
    artistId: 'eminem',
    artist: 'Eminem',
    cover: 'https://upload.wikimedia.org/wikipedia/en/3/35/EminemsTheEminemShow.png',
    year: 2023,
    genre: 'Hip-Hop',
    songCount: 17,
    duration: '58m',
  },
  {
    id: 'after-hours',
    title: 'After Hours',
    artistId: 'the-weeknd',
    artist: 'The Weeknd',
    cover: 'https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_After_Hours.png',
    year: 2020,
    genre: 'R&B',
    songCount: 14,
    duration: '56m',
  },
  {
    id: 'new-rules',
    title: 'New Rules',
    artistId: 'billie-eilish',
    artist: 'Billie Eilish',
    cover: 'https://upload.wikimedia.org/wikipedia/en/3/3a/Billie_Eilish_-_When_We_All_Fall_Asleep%2C_Where_Do_We_Go%3F.png',
    year: 2023,
    genre: 'Pop',
    songCount: 12,
    duration: '40m',
  },
];

export const playlists: Playlist[] = [
  {
    id: 'chill-vibes',
    title: 'Chill Vibes',
    description: 'Relax and unwind',
    cover: 'https://picsum.photos/seed/chill/300/300',
    songCount: 42,
    mood: 'Chill',
  },
  {
    id: 'workout',
    title: 'Workout',
    description: 'High energy beats',
    cover: 'https://picsum.photos/seed/workout/300/300',
    songCount: 35,
    mood: 'Energetic',
  },
  {
    id: 'sad-songs',
    title: 'Sad Songs',
    description: 'Feel the emotions',
    cover: 'https://picsum.photos/seed/sad/300/300',
    songCount: 28,
    mood: 'Sad',
  },
  {
    id: 'party-hits',
    title: 'Party Hits',
    description: 'Dance all night',
    cover: 'https://picsum.photos/seed/party/300/300',
    songCount: 50,
    mood: 'Party',
  },
  {
    id: 'focus',
    title: 'Focus Mode',
    description: 'Stay productive',
    cover: 'https://picsum.photos/seed/focus/300/300',
    songCount: 30,
    mood: 'Focus',
  },
  {
    id: 'sleep',
    title: 'Sleep',
    description: 'Drift away',
    cover: 'https://picsum.photos/seed/sleep/300/300',
    songCount: 20,
    mood: 'Sleep',
  },
];

export const genres: Genre[] = [
  { id: 'rap', name: 'Rap Songs', color: '#E91E63', image: 'https://picsum.photos/seed/rap/300/200' },
  { id: 'pop', name: 'Pop Songs', color: '#9C27B0', image: 'https://picsum.photos/seed/pop/300/200' },
  { id: 'rock', name: 'Rock Songs', color: '#FF5722', image: 'https://picsum.photos/seed/rock/300/200' },
  { id: 'hiphop', name: 'Hip-Hop', color: '#FF9800', image: 'https://picsum.photos/seed/hiphop/300/200' },
  { id: 'rnb', name: 'R&B', color: '#2196F3', image: 'https://picsum.photos/seed/rnb/300/200' },
  { id: 'indie', name: 'Indie', color: '#4CAF50', image: 'https://picsum.photos/seed/indie/300/200' },
];
