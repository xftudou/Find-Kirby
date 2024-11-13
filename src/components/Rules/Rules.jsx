import React from 'react';
import './Rules.css';

const Rules = () => {
    return (
        <div className='rules'>
            <h2>🎉 How to Play Find Kirby! 🎉</h2>
            <p>Welcome to <strong>Find Kirby!</strong> The evil Kirbies have captured our hero Waddle Dee! Let’s dive into the rules and get you started on your quest to save Waddle Dee!</p>
            <h3>🌟 Your Mission</h3>
            <ul>
                Rescue Waddle Dee by finding all the Kirbies hidden across the game board.
            </ul>
            <h3>🕹️ Game Elements</h3>
            <p>Each square on the board is a mystery waiting to be uncovered! Here's what you might find:</p>
            <ul>
                <li>
                    <strong>Number Square</strong><br />
                    Tells you how many Kirbies are lurking in the eight neighboring squares. These numbers are your secret clues to locating those playful Kirbies!
                </li>
                <li>
                    <strong>Empty Square</strong><br />
                    No Kirbies nearby—it’s safe! Revealing an empty square clears the way and uncovers more safe zones for you to explore.
                </li>
                <li>
                    <strong>Kirby Square</strong><br />
                    Oops! A Kirby is hiding here. Spotting a Kirby is risky, but with smart moves, you can avoid them and stay on track to win!
                </li>
            </ul>

            <h3>🎯 How to Play</h3>
            <p><strong>Left Clicks: Reveal a Square</strong><br />
                Left-click on any square to unveil what’s beneath.<br />
                <em>First Click Bonus:</em> Your very first click is always safe—no Kirbies there! Use this to kickstart your adventure.</p>
            <ul>
                <li>
                    <strong>Kirby Square Revealed</strong><br />
                    Uh-oh! A Kirby appears, and the game is over. Don’t worry! Each game is a new chance to try different strategies.
                </li>
                <li>
                    <strong>Number Square Revealed</strong><br />
                    A number pops up, giving you a hint about nearby Kirbies. Use these numbers to deduce where the Kirbies might be hiding.
                </li>
                <li>
                    <strong>Empty Square Revealed</strong><br />
                    You’ve found a safe spot! Plus, all connected empty squares are uncovered automatically. More safe areas mean more information to help you make smarter moves!
                </li>
            </ul>

            <p><strong>Right Clicks: Flag</strong><br />
                Right-click on square to use flags.<br /></p>
            <ul>
                <li>
                    <strong>Flag a Square:</strong><br />
                    Right-click to place a flag on a suspected Kirby square. Helps you mark tricky spots and stay organized.
                </li>
                <li>
                    <strong>Unflag a Square:</strong><br />
                    Right-click again to remove a flag if you change your mind. Flags are your personal notes—adjust them as your strategy evolves!
                </li>
            </ul>

            <h3>🏆 Winning the Game</h3>
            <ul>
                <li>
                    <strong>Victory!:</strong> Successfully reveal all non-Kirby squares without clicking on any Kirbies. Hooray! You’ve saved Waddle Dee and won the game!
                </li>
                <li>
                    <strong>Game Over:</strong> Click on a Kirby square, and the game ends. But don’t fret—every game is a chance to learn and improve!
                </li>
            </ul>
        </div>
    );
};

export default Rules;