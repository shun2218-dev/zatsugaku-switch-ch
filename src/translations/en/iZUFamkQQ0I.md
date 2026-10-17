---
# Claude で日本語から翻訳した英語版（AI 翻訳としてそのまま公開される）。人が確かめたら reviewedAt に日付（"2026-10-17" の形）を入れると「確認済み」と出る
reviewedAt: ""
translatedAt: "2026-10-17"
sourceHash: 5fb35cf66eb9
title: Why are soccer balls made of pentagons and hexagons?
answer: Soccer balls use pentagons and hexagons because combining 12 pentagons and 20 hexagons creates a shape very close to a sphere (a truncated icosahedron), so flat pieces of leather can be stitched together into a round ball. The black-and-white coloring came from the 1970 World Cup official ball, the Telstar, which FIFA says was designed to stand out on black-and-white TV. Today's World Cup official balls don't use this shape; they're made from far fewer panels.
description: Did you know the black-and-white pattern on a soccer ball isn't just for looks, but a trick to make it closer to a sphere? A quick trivia short you can enjoy on your commute.
scenes:
  - text: When you think of a soccer ball, you probably picture that pattern of black and white pentagons and hexagons.
    alt: A traditional black-and-white soccer ball floating and spinning
  - text: It turns out that shape was a clever way to get as close to a sphere as possible. By combining lots of flat faces, it recreates a round shape.
    alt: An exploded diagram of flat panels fitting together to form a sphere
  - text: The more panels there are, the closer the ball gets to a sphere, so it rolls and bounces more evenly and predictably.
    alt: A comparison of several balls with different numbers of panels
  - text: Recent World Cup official balls reportedly use even fewer panels, with curved ones, to get closer to a smoother sphere.
    alt: A futuristic-looking ball made of curved panels
  - text: Behind that ordinary-looking pattern was a whole lot of science aimed at making the ball roll evenly.
    alt: A ball rolling smoothly with a sparkling effect
sources:
  - title: Solution to Problem of the Month, June 2006
    publisher: KTH Royal Institute of Technology, Department of Mathematics (Problem of the Month)
    url: https://math.kth.se/math/TOPS/problem/S0606.html
    lang: en
  - title: The classification of football patterns
    publisher: Braungardt V. & Kotschick D., arXiv:math/0606193, 2006
    url: https://arxiv.org/abs/math/0606193
    lang: en
  - title: Wenn der Oktaederstumpf ins Eckige muss - Die Mathematik und unendlich viele Fußbälle（報道発表）
    titleEn: "When the Truncated Octahedron Has to Go into the Goal: Mathematics and Infinitely Many Soccer Balls (press release)"
    publisher: LMU Munich (Ludwig Maximilian University of Munich), idw-Informationsdienst Wissenschaft (June 9, 2006)
    url: https://idw-online.de/de/news163323
    lang: ja
  - title: The adidas Telstar begins ball chain
    publisher: FIFA (May 31, 2020)
    url: https://inside.fifa.com/news/telstar-story-fifa-world-cup-ball-3073424
    lang: en
  - title: Effect of panel shape of soccer ball on its flight characteristics
    publisher: Hong S. & Asai T., Scientific Reports, 2014
    url: https://pubmed.ncbi.nlm.nih.gov/24875291/
    lang: en
  - title: Comparative study of the aerodynamic characteristics and flight behavior of the FIFA World Cup 2026 ball Trionda
    publisher: Asai T. et al., Scientific Reports, 2026
    url: https://pubmed.ncbi.nlm.nih.gov/42437765/
    lang: en
  - title: "FIFA celebrates launch of Official Match Ball of FIFA World Cup 26: TRIONDA"
    publisher: FIFA (October 2, 2025)
    url: https://inside.fifa.com/media-releases/fifa-celebrates-launch-official-match-ball-world-cup-26-trionda
    lang: en
---
### 12 pentagons and 20 hexagons

The classic soccer ball is made by stitching together 12 pentagons and 20 hexagons, for a total of 32 panels (pieces of leather or other material). Every pentagon is surrounded entirely by hexagons, and three panels meet at every corner (vertex).

In mathematics, this shape is called a **truncated icosahedron**. It's what you get when you take a "regular icosahedron," made of 20 equilateral triangles, and slice a little off each of its 12 corners. The cut surfaces become pentagons, and the original triangles turn into hexagons. According to an explanation from the Department of Mathematics at KTH Royal Institute of Technology in Sweden, if you adjust how much you cut, every face can be a regular pentagon or regular hexagon. The shape has 60 corners and 90 edges.

A mathematician at Ludwig Maximilian University of Munich (LMU) in Germany also points out that this standard ball shape has exactly the same structure as the "buckyball," the simplest of the "fullerenes"—molecules made of carbon atoms linked into a sphere.

### Having "12" pentagons is no coincidence

If you cover a sphere using only pentagons and hexagons so that three panels meet at every corner, you will **always end up with exactly 12 pentagons**. This can be calculated from a rule for polyhedra: "number of corners − number of edges + number of faces = 2" (Euler's polyhedron formula). KTH's explanation shows that plugging the numbers of pentagons and hexagons into this formula fixes the number of pentagons at 12, no matter how many hexagons there are. If you add the condition that "one pentagon and two hexagons meet at each vertex," the number of hexagons is fixed at 20.

However, if you drop the condition that "three panels meet at every corner," other patterns are possible. The LMU mathematicians showed that if the only conditions are that pentagons border only hexagons, and hexagons border pentagons and hexagons alternately, you can make infinitely many pentagon-and-hexagon "soccer ball" patterns, and they organized all of them mathematically in a paper. The 32-panel shape is the most basic of them.

### The black-and-white pattern dates back to the 1970 "Telstar"

At the start of the video, we said the pattern "wasn't just for looks," but to be more precise, it's easier to understand if you think of it in two parts: **the shape is there to get closer to a sphere, and the black-and-white coloring is there for visibility**.

According to a FIFA article, adidas began making the official World Cup ball at the 1970 tournament in Mexico, and that ball, the "Telstar," was made of 32 leather panels and is described as "the roundest ball at the time." Its name comes from "television star," and FIFA explains that it was the first ball decorated with black panels, designed to stand out on black-and-white TV.

That said, LMU's press release cautiously states that this shape "is said to" have been adopted at the 1970 tournament because it looked good on TV, and notes that balls have also been made by stitching together irregularly shaped panels or long strips of leather. We couldn't find any sources confirming when, or by whom, the 32-panel shape was first made.

### More panels isn't necessarily better

In the video, we said that "the more panels there are, the closer the ball gets to a sphere, so it rolls and bounces more predictably," and then that "recent official balls use fewer panels." At first glance these seem contradictory, so let's sort it out a bit.

For a polyhedron built from flat plates, the more faces it has, the closer it gets to a sphere. But a real ball is inflated with air, so its panels bulge outward and become rounded. On top of that, the panels on recent balls are curved to begin with. According to LMU's press release, the 2006 World Cup official ball, the "Teamgeist," was already made of 14 curved panels. In later World Cups, the 2010 "Jabulani" had 8 panels, the 2014 "Brazuca" had 6, and the 2026 "Trionda" has 4. However, the number hasn't always gone down: the official ball of the 2013 Confederations Cup, the "Cafusa," had 32 panels like the old balls, but the panels were shaped completely differently from pentagons and hexagons.

A 2014 study from the University of Tsukuba compared balls using a wind tunnel (a device that blows artificial wind) and a kicking robot, and concluded that **the shape and orientation of the panels likely have a bigger effect on how a ball flies than the number of panels**. The 8-panel Jabulani showed larger fluctuations in the sideways and up-and-down forces acting on it in fast airflow than the other balls did. The number of panels alone doesn't determine how predictably a ball rolls or flies.

### Too "smooth" isn't good either

We should also add a note to the video's line about getting "closer to a smoother sphere." Being close to a perfect sphere matters, and balls used in official matches undergo roundness tests (explained in detail in the first article under "Related reading"). On the other hand, a completely slick surface isn't the goal.

According to FIFA's announcement, the seams between the Trionda's four panels have **deliberately deep grooves**, which ensure that enough air resistance acts on the ball evenly, helping it stay stable in flight. The surface also has small bumps to keep it from getting slippery even on wet days. A 2026 study by the University of Tsukuba and others also found that the Trionda has relatively high air resistance at high speeds, with calculations showing it travels slightly shorter distances than other official balls.

It seems fair to say that today's approach to ball design aims for a ball that flies straight and stable by combining "a round shape" with "a moderately textured surface."

### Related reading

- [Why are soccer balls made to roll so precisely?](/trivia/pL1OMtAp0jc/)
- [Why are snowflakes always hexagonal?](/trivia/C8m-Lr3L8Js/)
- [How can VAR spot offside down to the centimeter? How it works](/trivia/3zAB9wQF0Uw/)
