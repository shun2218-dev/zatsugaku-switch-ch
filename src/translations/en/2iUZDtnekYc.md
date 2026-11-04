---
# Claude で日本語から翻訳した英語版（AI 翻訳としてそのまま公開される）。人が確かめたら reviewedAt に日付（"2026-10-17" の形）を入れると「確認済み」と出る
reviewedAt: ""
translatedAt: "2026-11-04"
sourceHash: 99c9a2cbacbf
title: Why does a compass needle always point north?
answer: A compass needle points not to map north (true north) but to magnetic north, and the gap between the two is called magnetic declination. According to the Geospatial Information Authority of Japan, every part of Japan except Minamitorishima has a westward declination; in the 2020.0 magnetic charts, it's about 10 degrees in Sapporo and about 6 degrees in Naha. Also, aluminum and copper do feel a force from a magnet if you move the magnet toward or away from them, because this creates eddy currents.
description: Why do magnets stick only to iron, and why does a compass always point north? We gently explain these everyday mysteries through the direction of tiny particles inside metals and the fact that Earth itself is a giant magnet.
scenes:
  - text: Bring a magnet close to different metals, and iron sticks while aluminum and copper don't react. Have you ever wondered why?
    alt: A magnet pulling an iron paper clip toward it while nothing happens to an aluminum can next to it
  - text: The secret lies in tiny magnet-like particles inside the metal. In iron, these particles point in random directions.
    alt: A magnified illustration of the inside of iron, with small arrows pointing in random directions
  - text: When you bring a magnet close, those scattered particles all turn to face the same direction at once. That's how iron sticks to a magnet.
    alt: The arrows inside lining up in the same direction as a magnet approaches
  - text: Aluminum and copper, on the other hand, don't have particles that behave this way, so no matter how close the magnet gets, nothing lines up and they don't stick.
    alt: An illustration of the inside of aluminum, showing only uniform particles with no arrows
  - text: In fact, Earth itself acts like a giant magnet on the inside, creating an invisible flow of magnetic force all around it.
    alt: A cross-section of Earth with a large magnet-like shape inside and magnetic field lines gently extending outward
  - text: A compass needle is a small magnet whose particles have already been lined up. Earth's magnetism exerts a turning force on that needle, so it always comes to rest pointing north and south.
    alt: The silhouette of a small compass quietly turning to align with Earth's magnetic field lines
sources:
  - title: 地磁気を知る（地磁気の要素・偏角）
    titleEn: Understanding Geomagnetism (Geomagnetic Elements and Declination)
    publisher: Geospatial Information Authority of Japan
    url: https://www.gsi.go.jp/buturisokuchi/menu01_index.html
    lang: ja
  - title: 磁気図
    titleEn: Magnetic Charts
    publisher: Geospatial Information Authority of Japan
    url: https://www.gsi.go.jp/buturisokuchi/menu03_magnetic_chart.html
    lang: ja
  - title: 実験題目：アルミニウム板と磁石をもちいた渦電流の発生と制動力の実験
    titleEn: "Experiment: Generating Eddy Currents and Braking Force Using an Aluminum Plate and a Magnet"
    publisher: Shinji Muraishi (Tokyo Institute of Technology) / Japan Aluminium Association
    url: https://www.jilm.or.jp/uploads_content/2018/12/eddy-current-rev.pdf
    lang: ja
---
### A compass doesn't point to "map north"

In the video, we said the needle "always comes to rest pointing north and south." Here's a useful bit of extra information.

The north a compass points to (**magnetic north**) is off from the north on a map (**true north**). This difference is called **magnetic declination**.

According to the Geospatial Information Authority of Japan, "currently, every region of Japan except Minamitorishima (declination of 0 degrees) has a westward declination." In other words, across nearly all of Japan, compass north is **shifted west** of map north.

How big the shift is depends on where you are. In the 2020.0 magnetic charts, magnetic north in Sapporo is about **10 degrees** west of map north, and in Naha it's about **6 degrees**. The farther north you go, the larger it tends to be.

Ten degrees isn't a difference you can ignore. If you're using a map and compass in the mountains and don't correct for it, you'll end up way off course after walking a few kilometers. Topographic maps list the declination, so checking the value for the area you're in is a must.

### Declination is still shifting

Declination isn't a fixed number. The magnetic field originating deep inside Earth keeps changing slowly, so the Geospatial Information Authority of Japan **publishes magnetic charts every five years**. It also provides numerical data for each secondary mesh grid square, and the latest edition is the 2020.0 version.

So "which way is north," the piece of information you'd think would never change, actually gets updated every five years.

### Earth's North Pole side is a magnet's S pole

While we're at it, let's clear something up: a compass's N pole points north because there's something up north attracting it. Since N poles are attracted to S poles, **if you think of Earth as a big magnet, the North Pole side is the S pole**.

If you've memorized "the North Pole is the N pole," you've got it backward. The geographic North Pole and a magnet's N pole are two different things.

### Aluminum and copper react too, if you move them

When the video said "aluminum and copper don't react," there's a condition attached. To be precise, they don't react **while everything is still**.

When you move a magnet toward or away from aluminum, an electric current called an **eddy current** forms inside the aluminum. This current creates its own magnetic field, producing a force that resists the magnet's motion. The better a metal conducts electricity, the stronger this effect, and if you drop a neodymium magnet down a copper or aluminum pipe, you can see it fall noticeably slowly. Roll a magnet across an aluminum plate, and it slows down as if someone hit the brakes.

In terms of sticking, it's true that aluminum and copper don't stick to magnets. But that doesn't mean they have "nothing to do with magnets." Brakes on trains and amusement rides, as well as machines that sort metals, are built using this property.

### Related reads

- [Why do clock hands turn clockwise?](/trivia/_kO26npeFxE/)
- [Why doesn't stainless steel rust easily?](/trivia/ERyA1Hl4RO8/)
- [Why does static electricity happen more in winter?](/trivia/-wb2FoANwv0/)
