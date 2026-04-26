import Header from '@/components/layout/Header';
import HeroBanner from '@/components/ui/HeroBanner';
import WeeklyTopTracks from '@/components/sections/WeeklyTopTracks';
import NewReleases from '@/components/sections/NewReleases';
import TrendingSongs from '@/components/sections/TrendingSongs';
import PopularArtists from '@/components/sections/PopularArtists';
import RecentlyPlayed from '@/components/sections/RecentlyPlayed';
import { songs, artists, albums } from '@/lib/data';
import styles from './page.module.css';

export default function Home() {
  const topTracks = songs.slice(0, 5);
  const newReleases = albums.slice(0, 6);
  
  return (
    <>
      <Header title="Home page" />
      <div className="page-content" style={{ paddingTop: '24px' }}>
        <div className={styles.homeLayout}>
          {/* Main Content Area */}
          <div className={styles.mainFeed}>
            <HeroBanner 
              artistName="Billie Eilish"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Billie_Eilish_2019.png/800px-Billie_Eilish_2019.png"
              badgeText="Featured Artist"
            />
            <RecentlyPlayed />
            <TrendingSongs songs={songs} />
            <PopularArtists artists={artists} />
          </div>

          {/* Right Sidebar Content */}
          <div className={styles.sideFeed}>
            <WeeklyTopTracks songs={topTracks} />
            <NewReleases albums={newReleases} />
          </div>
        </div>
      </div>
    </>
  );
}
