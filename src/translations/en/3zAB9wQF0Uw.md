---
# Claude で日本語から翻訳した英語版（AI 翻訳としてそのまま公開される）。人が確かめたら reviewedAt に日付（"2026-10-17" の形）を入れると「確認済み」と出る
reviewedAt: ""
translatedAt: "2026-10-17"
sourceHash: 45c2532f1425
title: How can VAR spot offside down to the centimeter? Here's how it works
answer: Offside calls get help from "semi-automated offside technology" (SAOT). At the 2022 World Cup, 12 dedicated cameras tracked 29 points on each player's body 50 times per second, and a sensor inside the ball recorded data 500 times per second. However, FIFA hasn't published any accuracy figure that would back up "down to the centimeter," and the final call is always made by human referees.
description: How can soccer's VAR (video review) judge goals and offsides so accurately? The secret is a large number of dedicated cameras installed around the stadium, plus tracking technology that follows players' skeletons. In 20 seconds, we break down the system behind millimeter-level calls the human eye can't make.
scenes:
  - text: Did you know that bad calls in soccer are actually getting closer to zero every year? The reason behind it is VAR, or video review.
    alt: Overhead view of a stadium with silhouettes of players in a match
  - text: VAR is really a set of dedicated cameras placed all around the stadium, sometimes more than 20 of them.
    alt: Multiple camera icons positioned around the top of a stadium
  - text: These cameras record the positions of players' bodies hundreds of times per second and turn them into skeleton-like line data.
    alt: Illustration of skeleton-like lines overlaid on a player's body
  - text: That's why the offside line can be judged not by a referee's eye, but by a virtual line drawn by a computer.
    alt: A semi-transparent judgment line drawn across the pitch
  - text: Machines fill in millimeter-level differences the human eye can't judge, using objective data. That's what VAR really is.
    alt: A referee checking a decision on a monitor screen
sources:
  - title: Semi-automated offside technology（FIFA World Cup Qatar 2022）
    publisher: FIFA
    url: https://inside.fifa.com/technical/football-technology/football-technologies-and-innovations-at-the-fifa-world-cup-2022/semi-automated-offside-technology
    lang: en
  - title: FIFA Quality Programme for Offside Technology - Test Manual（February 2026）
    publisher: FIFA
    url: https://digitalhub.fifa.com/m/02a5079971342b5d/original/FIFA-Quality-Programme-for-Offside-Technology-Test-Manual-February-2026.pdf
    lang: en
  - title: Landmark innovations at FIFA Club World Cup to enhance fan experience, transparency and operations
    publisher: FIFA (June 6, 2025)
    url: https://inside.fifa.com/innovation/news/landmark-innovations-club-world-cup-enhance-fan-experience-transparency-operation
    lang: en
  - title: "FIFA celebrates launch of Official Match Ball of FIFA World Cup 26: TRIONDA"
    publisher: FIFA (October 2, 2025)
    url: https://inside.fifa.com/media-releases/fifa-celebrates-launch-official-match-ball-world-cup-26-trionda
    lang: en
  - title: Video Assistant Referee (VAR) protocol
    publisher: The International Football Association Board (IFAB)
    url: https://www.theifab.com/laws/latest/video-assistant-referee-var-protocol/
    lang: en
  - title: VAR discussed at IFAB media briefing
    publisher: FIFA (March 3, 2018)
    url: https://inside.fifa.com/en/refereeing/news/var-discussed-at-ifab-media-briefing
    lang: en
  - title: Is perception of VAR outcome biomechanically accurate?
    publisher: Soltani P., ISBS Proceedings Archive, 2022
    url: https://commons.nmu.edu/isbs/vol40/iss1/158
    lang: en
---
### VAR is a referee, not a camera

First, let's get the terms straight. According to the official VAR procedures in the Laws of the Game (IFAB's VAR protocol), the VAR (video assistant referee) is **a match official who has independent access to match footage**. The VAR can only help in limited situations, such as when there's a "clear and obvious error" involving a goal, a penalty, or a straight red card, and the final decision always rests with the on-field referee.

The video said "VAR is really a set of dedicated cameras," but more precisely, one of the tools that helps the VAR (a referee) is "semi-automated offside technology" (SAOT), which uses cameras and computers.

### How it worked at the 2022 World Cup

According to FIFA, the SAOT used at the 2022 tournament in Qatar worked like this:

- 12 dedicated tracking cameras were mounted underneath the stadium roof.
- The system tracked the ball and up to 29 points on each player (such as the ends of limbs, the body parts relevant to offside decisions) 50 times per second, calculating their positions on the pitch.
- The ball contained a motion sensor (an IMU, or inertial measurement unit) that sent data 500 times per second. This pinpointed the exact "kick point," the moment the ball was played.

When a player in an offside position received the ball, an AI-assisted system automatically sent an "possible offside" alert to the video room. The video officials then checked the automatically selected kick point and the automatically drawn offside line with their own eyes before informing the referee. The same positional data was also used to create 3D animations, which were shown on stadium screens and elsewhere.

The video's claims of "more than 20 dedicated cameras" and "recording hundreds of times per second" are a bit of an overstatement. According to the official figures for the Qatar tournament, there were 12 dedicated cameras, players' bodies were recorded 50 times per second, and it was the ball sensor that ran at 500 times per second. Equipment varies by tournament and venue; an upgraded version was used at the 2025 Club World Cup, but FIFA's announcement only says "multiple" cameras. The official ball of the 2026 World Cup, "Trionda," also contains a 500Hz (500 times per second) sensor.

### Can it really judge "down to the centimeter"?

We couldn't verify the title's claim of spotting offside "down to the centimeter" in FIFA's public materials. FIFA has not published a specific accuracy figure for SAOT in centimeters.

One useful reference is FIFA's test manual for certifying offside technology (February 2026 edition). Markers are placed on the pitch at precisely measured positions, and testers check whether the line drawn by the system falls within a set range. The pass range is **±25 cm** from the true position in ground-level tests, and ±20 cm at the player's location in tests where part of the body is off the ground. This is a minimum standard ("fail if outside this range"), and it doesn't mean actual systems are off by that much, but it does show the system isn't designed to promise "centimeter-level" accuracy.

### The gaps between recordings

Another limitation is the recording rate. 50 times per second means there's 0.02 seconds between each recording. For example, a player running at 8 meters per second would move 16 cm in 0.02 seconds. The ball sensor runs at 500 times per second, so the kick point can be identified more precisely, but FIFA's public materials don't explain how the players' positions at that exact moment are filled in.

It's even harder when humans judge from video. In a study at the University of Bath in the UK, 10 participants watched footage and picked the kick point an average of 0.132 seconds late. Using the ball sensor to detect the kick point automatically is a way to make up for this weakness.

### Have bad calls really dropped to "nearly zero"?

The video opened by saying "bad calls are getting closer to zero every year." In trials before VAR was officially introduced, KU Leuven in Belgium studied about 1,000 matches and reported that the accuracy of match-changing decisions rose from 93% without VAR to 98.8% with VAR. That's certainly a big improvement, but it isn't "zero." Offside is a decision based on measurable positions, but even so, it has limits like the recording rate and machine error. Knowing that can give you a deeper appreciation of the game.

### Related reading

- [Why are split-second offside calls in soccer so accurate?](/trivia/TXtg5ERTk3I/)
- [Why haven't bad calls in soccer completely disappeared, even with VAR?](/trivia/SO6mE2Xz4d4/)
- [Why is offside determined by the "second-to-last" opponent?](/trivia/DAmkVLn-OAA/)
