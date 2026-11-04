---
# Claude で日本語から翻訳した英語版（AI 翻訳としてそのまま公開される）。人が確かめたら reviewedAt に日付（"2026-10-17" の形）を入れると「確認済み」と出る
reviewedAt: ""
translatedAt: "2026-11-04"
sourceHash: b63abe6a3936
title: Why do airplane windows have rounded corners?
answer: Because square-cornered windows crack when force piles up at the corners. The Japan Society of Mechanical Engineers' JSME Mechanical Engineering Dictionary defines stress concentration as the phenomenon in which stress "generally increases locally" around holes and notches, and lists "increasing the radius of curvature of fillets" as a countermeasure. In the 1954 midair breakup of a de Havilland Comet, investigators concluded the direct cause was "the initiation of fatigue cracks from the corners of the cabin windows." Rounded windows are that lesson, built right into the plane.
description: The rounded windows on airplanes hide a clever bit of safety engineering. In this 20–30 second Zatsugaku Switch trivia video, we explain why airplane windows are shaped the way they are.
scenes:
  - text: Have you noticed that airplane windows aren't square, but rounded? It's not just a stylish design choice — there's a real reason for it.
    alt: Exterior side shot of an airplane with a row of rounded windows
  - text: In the 1950s, early jet airliners used square windows. But up in the sky, the air pressure is low, so the plane's body is constantly under strong force.
    alt: Silhouette of an old airliner with square windows, with arrows showing pressure acting on the fuselage
  - text: With square windows, force tended to concentrate at the corners, and metal fatigue could cause cracks to spread from there.
    alt: Close-up icon-style illustration of a crack forming at the corner of a square window
  - text: So by making the windows rounded, the force no longer gathers at a single point — it spreads out over the whole shape.
    alt: Force spreading evenly around a round window, shown as a circular icon with soft ripple-like lines
  - text: So the round windows on today's planes are the result of safety improvements built up over time.
    alt: A modern airliner flying through a blue sky, side shot showing a row of rounded windows
sources:
  - title: ジェット旅客機コメットの空中分解（失敗知識データベース）
    titleEn: The Midair Breakup of the Comet Jet Airliner (Failure Knowledge Database)
    publisher: Japan Science and Technology Agency (JST)
    url: https://www.shippai.org/fkd/cf/CB0071012.html
    lang: ja
  - title: 応力集中（機械工学事典）
    titleEn: Stress Concentration (JSME Mechanical Engineering Dictionary)
    publisher: The Japan Society of Mechanical Engineers (JSME)
    url: https://www.jsme.or.jp/jsme-medwiki/doku.php?id=07:1001454
    lang: ja
---
### Corners make force pile up in one spot

Let's start with the principle. The Japan Society of Mechanical Engineers' JSME Mechanical Engineering Dictionary defines stress concentration like this:

> When a structure contains holes, notches, or the like, and its otherwise uniform shape changes, the stress distribution is disturbed at that location, and stress generally increases locally. This phenomenon is called stress concentration.

Even under the same load, stress gathers at a single point wherever the shape changes abruptly. There's even a number for how severe it is:

> To express the degree of stress concentration, the value obtained by dividing the maximum stress by a reference stress (the nominal stress) — the stress concentration factor — is used.

And the countermeasure is spelled out clearly:

> To deal with strength problems, stress-relieving notches that ease stress concentration — by increasing the radius of curvature of fillets, changing the position of stress-concentrating features, and so on — have also been proposed.

"Increasing the radius of curvature of fillets" — in other words, making the corners more rounded. Airplane windows are round because they're that single line turned into a shape.

### 1954: a Comet breaks apart in midair

There was an accident in which this principle was confirmed at a terrible cost. Here's how the Japan Science and Technology Agency's Failure Knowledge Database describes it:

> On January 10, 1954, Comet G-ALYP — the world's first jet airliner with a pressurized cabin — took off from Rome and, upon reaching an altitude of about 8,000 m near the island of Elba in the Mediterranean, broke apart in midair due to fatigue failure caused by repeated pressurization, killing all 35 people on board.

The wreckage was raised from the seabed and investigated, and the conclusion was this:

> As a result of investigation and research that even enlisted physicists, it became clear that the direct cause of the accident was the initiation of fatigue cracks, driven by cabin pressurization, from a cutout in the fuselage roof (the antenna window) and from the corners of the cabin windows, and that the fatigue cracks grew to wrap around the fuselage, causing unstable fracture that led to a rupture.

**The corners of the cabin windows.** That's where it started.

### A plane's fuselage swells and shrinks on every flight

Why does so much force hit the corners of the windows? The same database explains with numbers:

> Normally, cabin pressure is maintained at 0.79 atmospheres, equivalent to the atmospheric pressure at 2,100 m. If the plane cruises in the stratosphere at 12,000 m, where atmospheric pressure is 0.19 atmospheres, then an internal pressure change equal to the 0.6-atmosphere difference occurs on every flight.

A 0.6-atmosphere difference between inside and outside. And what does that do?

> Internal pressure changes of this size cause the fuselage to repeatedly expand and contract by about 1–2 mm.

Every time a plane takes off, its fuselage puffs up slightly like a balloon, and every time it lands, it shrinks back. Just 1–2 millimeters each time. That sounds tiny, but it repeats thousands of times.

The propeller planes that came before jets flew at lower altitudes, so this repetition wasn't a problem. The database writes that "in jet airliners flying in the stratosphere, internal pressure changes in the fuselage due to cabin pressurization occur on every flight, and the resulting low-cycle-count, low-cycle-rate fatigue (low-cycle fatigue) becomes a problem." A new kind of vehicle — the jet airliner — brought with it a new way of breaking.

### Ground tests: 18,000 cycles. Real planes: failed at 1,290

Here's the scariest part. It's not that the Comet was never tested.

> Before the first aircraft entered service, internal pressure fatigue tests were conducted on the ground using an actual fuselage, confirming that detectable fatigue cracks first appeared only after 18,000 cycles, and the guaranteed fatigue life (number of flights) was considered sufficient.

But in reality:

> However, the actual accidents occurred after an order of magnitude fewer flights: 1,290 for G-ALYP and 900 for G-ALYY.

A guarantee of 18,000 cycles, versus 1,290 and 900. That's a whole different order of magnitude.

The cause lay in the testing method itself. A proof-pressure test required by regulations had unintentionally made the test airframe "stronger."

> The excessive pressure of the proof test caused tensile plastic deformation at the window corners due to stress concentration. After unloading, this plastically deformed region is constrained by the surrounding elastic material and becomes a field of compressive residual stress. Repeating internal pressure cycles in this state has the same effect as keeping the mean stress low, and as a result the fatigue life was mistakenly judged to be longer than it was

When the window corners were hit with twice the normal pressure, the material at the corners deformed slightly and permanently. After the load was removed, compressive residual stress remained there — and that delayed the start of cracks. Planes in actual service didn't undergo the proof test, so they didn't have this "bonus strength."

The numbers from verification experiments survive too. When an actual aircraft that had flown 1,230 times was tested with the proof-test pressure lowered to 0.75 atmospheres, "fatigue cracks appeared after a further 1,830 cycles at 0.56 atmospheres." That's 3,060 cycles in total — about one-sixth of the 18,000 cycles achieved with the proof test.

The conclusion reads:

> In other words, it became clear that the fatigue life obtained from ground-based internal pressure fatigue tests on an actual fuselage becomes extremely long due to the effect of the proof tests performed during testing, and that the fatigue life of the actual aircraft cannot be predicted on the safe side.

### Round windows came out of 35 deaths

Another problem with the testing method was also pointed out:

> In the internal pressure fatigue tests, instead of using the aircraft's entire structure, a section of the fuselage was cut out like a slice and fixed to a steel reaction wall, so deformation and strain were underestimated compared with an actual aircraft.

If you bolt a slice of fuselage to a steel wall, it won't deform the way a real fuselage does. It effectively "passed" under less strain than a real plane would experience.

The rounded windows we gaze out of from our seats today aren't about design or whim. They're the answer reached by applying the principle of stress concentration to the hard fact that people died because of square-cornered windows. You could say the shape of the window is the conclusion of an accident report, turned directly into form.

### Related reads

- [Why do planes shake when they fly through clouds?](/trivia/2K-M8wQeugs/)
- [Why are manhole covers always round?](/trivia/vTmjZkwqerg/)
- [Why does paper tear more easily along a spot where it's been folded?](/trivia/KjfyWlDx67w/)
