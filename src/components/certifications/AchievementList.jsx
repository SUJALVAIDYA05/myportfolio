import AchievementBlock from './AchievementBlock.jsx';
import achievementsData from '../../data/achievements.js';

/**
 * AchievementList — Stacked list of competition blocks.
 * Follows design.md §4.7 and animations.md §7:
 * - One block per competition, stacked vertically with generous spacing.
 * - Reads from src/data/achievements.js.
 *
 * @param {Object} props
 * @param {Array} [props.achievements=achievementsData] - Array of achievement objects
 */
export default function AchievementList({ achievements = achievementsData }) {
  return (
    <div className="w-full space-y-10 sm:space-y-14 lg:space-y-16">
      {achievements.map((achievement, index) => (
        <AchievementBlock
          key={achievement.id}
          achievement={achievement}
          index={index}
        />
      ))}
    </div>
  );
}
