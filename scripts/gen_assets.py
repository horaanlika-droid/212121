#!/usr/bin/env python3
"""Generates all PNG art for app «21» — 1-bit e-ink pixel style. Pure stdlib."""
import zlib, struct, os, math, random

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")
os.makedirs(OUT, exist_ok=True)

PAL = {'.': (0,0,0,0), 'k': (20,20,20,255), 'w': (247,245,240,255),
       'g': (125,125,125,255), 'd': (70,70,70,255), 'b': (205,202,195,255)}

def write_png(path, w, h, get):
    raw = bytearray()
    for y in range(h):
        raw.append(0)
        for x in range(w):
            raw.extend(get(x, y))
    def chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)
    ihdr = struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0)
    png = b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', ihdr) + chunk(b'IDAT', zlib.compress(bytes(raw), 9)) + chunk(b'IEND', b'')
    with open(path, 'wb') as f:
        f.write(png)

def grid(rows):
    h = len(rows); w = max(len(r) for r in rows)
    px = [[PAL.get(c, PAL['.']) for c in (r + '.' * (w - len(r)))] for r in rows]
    return px

def scaled(px, n):
    h = len(px); w = len(px[0])
    return [[px[y // n][x // n] for x in range(w * n)] for y in range(h * n)]

def save(name, px):
    h = len(px); w = len(px[0])
    write_png(os.path.join(OUT, name), w, h, lambda x, y: px[y][x])
    print("wrote", name, f"{w}x{h}")

# ---------------- 8x8 glyphs ----------------
G = {}
G['drop'] = ["...k....","...kk...","..kkkk..",".kkkkkk.",".kkkkkk.",".kkkkkk.","..kkkk..","...kk..."]
G['bolt'] = ["...kkkk.","..kkkk..",".kkkk...","kkkkkkk.","..kkkk..",".kkkk...","kkkk....","kk......"]
G['apple'] = ["...k....","...kk...",".kkkkkk.","kkkkkkkk","kkkkkkkk","kkkkkkkk",".kkkkkk.","..k..k.."]
G['hammer'] = ["kkkkkkk.","kkkkkkkk","...kk...","...kk...","...kk...","...kk...","...kk...","...kk..."]
G['tools'] = ["k.....k.","kk...kk.",".kk.kk..","..kkk...","..kkk...",".kk.kk..","kk...kk.","k.....k."]
G['sprout'] = ["..k..k..",".kkk.kkk",".kkkkkk.","..kkkk..","...kk...","...kk...","...kk...","..kkkk.."]
G['book'] = ["kkkkkkk.","k.....k.","k.....k.","k..k..k.","k.....k.","k.....k.","kkkkkkk.","........"]
G['brain'] = ["..kkkk..",".kkkkkk.","kk.kk.kk","kkkkkkkk","kk.kk.kk","kkkkkkkk",".kkkkkk.","..k..k.."]
G['fire'] = ["...k....","...kk...","..kkk.k.",".kkkkkk.",".kk.kkk.","kkkkkkkk","kkkkkkkk",".kkkkkk."]
G['tent'] = ["...kk...","...kk...","..k..k..","..k..k..",".k.kk.k.",".k.kk.k.","kkkkkkkk","........"]
G['mush'] = [".kkkkkk.","kkkkkkkk","kkkkkkkk","...kk...","...kk...","..kkkk..","........","........"]
G['cross'] = ["........","...kk...","...kk...","kkkkkkkk","kkkkkkkk","...kk...","...kk...","........"]
G['compass'] = ["..kkkk..",".k....k.","k..kk..k","k..kk..k","k...kk.k","k....k.k",".k....k.","..kkkk.."]
G['signal'] = ["k......k",".k....k.","..k..k..","...kk...","...kk...","...kk...","..kkkk..",".kkkkkk."]
G['face'] = ["..kkkk..",".k....k.","k.k..k.k","k......k","k......k","k.k..k.k",".k.kk.k.","..kkkk.."]
G['star'] = ["...kk...","..kkkk..","kkkkkkkk",".kkkkkk.","..kkkk..",".kk..kk.","k......k","........"]
G['heart'] = [".kk..kk.","kkkkkkkk","kkkkkkkk","kkkkkkkk",".kkkkkk.","..kkkk..","...kk...","........"]
G['pin'] = ["..kkkk..",".kkkkkk.",".kkwwkk.",".kkwwkk.","..kkkk..","...kk...","...kk...","........"]
G['lock'] = ["..kkkk..",".k....k.",".k....k.","kkkkkkkk","kkkkkkkk","kkk..kkk","kkkkkkkk","........"]
G['check'] = ["........","......k.",".....kk.","k...kk..","kk.kk...",".kkk....","..k.....","........"]
G['plus'] = ["...kk...","...kk...","...kk...","kkkkkkkk","kkkkkkkk","...kk...","...kk...","...kk..."]
G['minus'] = ["........","........","........","kkkkkkkk","kkkkkkkk","........","........","........"]
G['search'] = [".kkkk...","k....k..","k....k..","k....k..",".kkkk...",".....kk.","......kk","........"]
G['filter'] = ["kkkkkkkk","kkkkkkkk",".kkkkkk.","..kkkk..","...kk...","...kk...","...kk...","........"]
G['edit'] = [".....kk.","....kkkk","...kkkk.","..kkk...",".kkk....","kkk.....","kk......","k......."]
G['send'] = [".......k","......kk",".....kkk","kkkkkkkk","kkkkkkkk",".....kkk","......kk",".......k"]
G['info'] = ["..kkkk..",".k....k.","...kk...","...kk...","...kk...","...kk...",".k....k.","..kkkk.."]
G['download'] = ["...kk...","...kk...","...kk...",".kkkkkk.","..kkkk..","...kk...","kkkkkkkk","kkkkkkkk"]
G['arrowr'] = ["...k....","...kk...","...kkk..","kkkkkkkk","kkkkkkkk","...kkk..","...kk...","...k...."]
G['arrowl'] = ["....k...","...kk...","..kkk...","kkkkkkkk","kkkkkkkk","..kkk...","...kk...","....k..."]
G['close'] = ["kk....kk","kkk..kkk",".kkkkkk.","..kkkk..","..kkkk..",".kkkkkk.","kkk..kkk","kk....kk"]
G['bell'] = ["...kk...","..kkkk..","..kkkk..",".kkkkkk.",".kkkkkk.","kkkkkkkk","kkkkkkkk","...kk..."]
G['house'] = ["...kk...","..kkkk..",".kkkkkk.","kkkkkkkk",".k....k.",".k.kk.k.",".k.kk.k.",".kkkkkk."]
G['chat'] = [".kkkkkk.","kkkkkkkk","kkkkkkkk","kkkkkkkk","kkkkkkkk",".kkkkkk.","...kk...","..kk...."]
G['person'] = ["..kkkk..",".kkkkkk.",".kkkkkk.","..kkkk..",".kkkkkk.","kkkkkkkk","kkkkkkkk","kkkkkkkk"]
G['trash'] = ["..kkkk..",".kkkkkk.",".k.kk.k.",".k.kk.k.",".k.kk.k.",".k.kk.k.",".kkkkkk.","........"]
G['lamp'] = ["..kkkk..","..k..k..","..kkkk..","...kk...","...kk...","...kk...","..kkkk..",".kkkkkk."]
G['bench'] = ["kkkkkkkk","kkkkkkkk",".k....k.",".k....k.","kk....kk","kk....kk","........","........"]
G['swing'] = ["kkkkkkkk",".k....k.",".k....k.",".kkkkkk.",".k....k.","........","........","........"]
G['tree'] = ["..kkkk..",".kkkkkk.","kkkkkkkk",".kkkkkk.","kkkkkkkk","...kk...","...kk...","........"]
G['ruble'] = [".kkkkk..",".k...k..",".k...k..",".kkkk...",".k.kk...",".k.kk...",".k......",".k......"]
G['clock'] = ["..kkkk..",".k....k.","k..k...k","k..k...k","k..kk..k","k......k",".k....k.","..kkkk.."]
G['eye'] = ["..kkkk..",".kkkkkk.","kk.kk.kk","k..kk..k","kk.kk.kk",".kkkkkk.","..kkkk..","........"]
G['sun'] = ["...kk...","k..kk..k",".kkkkkk.","..kkkk..","..kkkk..",".kkkkkk.","k..kk..k","...kk..."]
G['wrench'] = [".kk..kk.",".kk..kk.","..kkkk..","...kk...","...kk...","..kkkk..","..kkkk..","........"]
G['shield'] = ["kkkkkkkk","kkkkkkkk","kk.kk.kk","kkkkkkkk",".kkkkkk.",".kkkkkk.","..kkkk..","...kk..."]
G['seed'] = ["........","....kk..","...kkk..","..kkk...","..kk....",".kkkk...","kkkkkk..",".kkkk..."]
G['crown'] = ["k..kk..k","k..kk..k","kk.kk.kk","kkkkkkkk","kkkkkkkk",".kkkkkk.",".kkkkkk.","........"]
G['key'] = ["..kkkk..",".k....k.",".k....k.","..kkkk..","...kk...","...kkk..","...kk...","...kkk.."]
G['flag'] = ["kk......","kkkkkkk.","kkkkkkk.","kkkkkkk.","kk......","kk......","kk......","........"]

# ---------------- bases ----------------
def badge_base(size=32):
    px = [[PAL['.']]*size for _ in range(size)]
    c = (size-1)/2.0
    for y in range(size):
        for x in range(size):
            r = math.hypot(x-c, y-c)
            if r <= size/2-1.5: px[y][x] = PAL['w']
            if size/2-3.2 < r <= size/2-0.5: px[y][x] = PAL['k']
            a = math.atan2(y-c, x-c)
            if size/2-6.5 < r <= size/2-5.0 and int(a*20) % 2 == 0: px[y][x] = PAL['k']
    return px

def item_base(size=32):
    px = [[PAL['.']]*size for _ in range(size)]
    c = (size-1)/2.0
    for y in range(size):
        for x in range(size):
            m = abs(x-c)+abs(y-c)
            if m <= size/2-1.5: px[y][x] = PAL['w']
            if size/2-3.2 < m <= size/2-0.5: px[y][x] = PAL['k']
            if size/2-6.5 < m <= size/2-5.0 and (x+y) % 4 < 2: px[y][x] = PAL['k']
    return px

def put(base, glyph, ox, oy, remap=None):
    for gy, row in enumerate(glyph):
        for gx, el in enumerate(row):
            if isinstance(el, str):
                if el != '.':
                    base[oy+gy][ox+gx] = PAL[remap[el] if remap and el in remap else el]
            else:
                if el != PAL['.'] and oy+gy < len(base) and ox+gx < len(base[0]):
                    base[oy+gy][ox+gx] = el

def badge(glyph, size=32):
    b = badge_base(size)
    g = scaled(grid(glyph), 2)
    put(b, g, (size-16)//2, (size-16)//2)
    return b

def item(glyph, size=32):
    b = item_base(size)
    g = scaled(grid(glyph), 2)
    put(b, g, (size-16)//2, (size-16)//2)
    return b

def marker(glyph):
    w, h = 24, 32
    px = [[PAL['.']]*w for _ in range(h)]
    cx, cy, r = 11.5, 10.5, 10.5
    for y in range(h):
        for x in range(w):
            if math.hypot(x-cx, y-cy) <= r: px[y][x] = PAL['k']
    for i in range(10):
        ww = max(1, 10-i)
        y = 18+i
        if y < h:
            for x in range(12-ww//2, 12+ww//2+1):
                if 0 <= x < w: px[y][x] = PAL['k']
    g = scaled(grid(glyph), 2)
    put(px, g, 4, 3, remap={'k': 'w'})
    return px

# ---------------- portraits ----------------
HAIR = [
 ["..kkkkkk..",".kkkkkkkk.",".kk.kk.kk.","..kkkkkk.."],          # bob
 ["...kkkk...","..kkkkkk..","..k.k.k...","........"],          # sparse+beard later
 [".kkkkkkkk.","kkkkkkkkkk","kk......kk","........"],          # long
 ["...kkkk...","..kkkkkk..","..kkkkkk..","...kk....."],          # bun
 ["..k.k.k...",".kkkkkkkk.",".kkkkkkkk.","........"],          # spiky
 ["..kkkkkk..",".kk....kk.",".kkkkkkkk.","........"],          # cap-like
 ["...kkkk...","..kkkkkk..",".kk.kk.kk.",".kkkkkkkk."],          # curly
 ["..kkkkkk..",".kkkkkkkk.",".kkkkkkkk.","........"],          # hood
 ["........","..kkkkkk..","..kkkkkk..","..k.k.k..."],          # bald+beard
]
def portrait(i):
    s = 12
    px = [[PAL['.']]*s for _ in range(s)]
    hair = HAIR[i % len(HAIR)]
    for y, row in enumerate(hair):
        for x, ch in enumerate(row):
            if ch == 'k': px[y][x+0] = PAL['k']
    # face outline rows 4..10
    for y in range(4, 11):
        px[y][2] = PAL['k']; px[y][9] = PAL['k']
    for x in range(2, 10):
        px[10][x] = PAL['k']
        if px[4][x] == PAL['.']: px[4][x] = PAL['w']
    for y in range(5, 10):
        for x in range(3, 9): px[y][x] = PAL['w']
    px[6][4] = PAL['k']; px[6][7] = PAL['k']      # eyes
    px[8][5] = PAL['k']; px[8][6] = PAL['k']      # smile
    return scaled(px, 2)

# ---------------- avatar / robot ----------------
AVATAR_ROWS = [
"....kkkkkk....",
"...kkkkkkkk...",
"...kwwwwwwk...",
"...kwk..kwk...",
"...kwwwwwwk...",
"....kwwwwk....",
".....kkkk.....",
"..kkkkkkkkkk..",
".kkkkkkkkkkkk.",
".kk.kkkkkk.kk.",
".kk.kkkkkk.kk.",
"....kk..kk....",
"....kk..kk....",
"...kkk..kkk...",
]
def avatar():
    return scaled(grid(AVATAR_ROWS), 2)

ROBOT = [
"......kk........",
"......kk........",
"...kkkkkkkkkk...",
"..kkwwwwwwwwkk..",
".kkwwkkwwkkwwkk.",
".kkwwkkwwkkwwkk.",
".kkwwwwwwwwwwkk.",
".kkwwwkkkkwwwkk.",
"..kkwwwwwwwwkk..",
"...kkkkkkkkkk...",
".....kkkkkk.....",
"..kkkkkkkkkkkk..",
".kkkkkkkkkkkkkk.",
".kk.kkkkkkkk.kk.",
".kk.kkkkkkkk.kk.",
"..k..kkkkkk..k..",
]
def robot():
    return scaled(grid(ROBOT), 2)

# accessories (16x16 overlay)
ACC_CAP = ["................","................","....kkkkkkkk....","...kkkkkkkkkk...","...kkkkkkkkkk...","..kkkkkkkkkkkkkk","................","................","................","................","................","................","................","................","................","................"]
ACC_GLASSES = ["................","................","................","................","..kkkk....kkkk..","..k.kk....kk.k..","..kkkk....kkkk..","...kk......kk...","....kkkkkkkk....","................","................","................","................","................","................","................"]
ACC_FLOWER = ["................","....kk..........","...kwwk.........","....kwk.........","...kwwk.........","....kk..........",".....k..........","................","................","................","................","................","................","................","................","................"]

# status bar
def stbar():
    sig = grid(["....k","..kkk",".kkkk","kkkkk"]); 
    wifi = grid([".kkkkk.","..kkk..","...k..."]); 
    batt = grid(["kkkkkkk.","kwwwwwkk","kwwwwwkk","kwwwwwkk","kwwwwwkk","kkkkkkk."])
    return sig, wifi, batt

DIG = {'2': ["111","001","111","100","111"], '1': ["010","110","010","010","111"]}
def digits(s, n, color='k'):
    w = len(s)*4*n - n; h = 5*n
    px = [[PAL['.']]*w for _ in range(h)]
    ox = 0
    for ch in s:
        for ry, row in enumerate(DIG[ch]):
            for rx, c in enumerate(row):
                if c == '1':
                    for yy in range(n):
                        for xx in range(n):
                            px[ry*n+yy][ox+rx*n+xx] = PAL[color]
        ox += 4*n
    return px

BAYER = [[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]]
def dith(x, y, t):
    return (BAYER[y & 3][x & 3] + 0.5) / 16.0 > t

# ---------------- hero scene ----------------
def hero():
    w, h = 320, 170
    px = [[PAL['w']]*w for _ in range(h)]
    rnd = random.Random(21)
    # mountains
    def ridge(x, c, hw, ht, base):
        d = abs(x - c)
        return base - max(0, ht * (1 - d / hw)) if d < hw else base
    for x in range(w):
        y1 = int(min(ridge(x, 60, 90, 55, 78), ridge(x, 250, 110, 62, 80)))
        for y in range(max(0, y1), 82):
            if y == y1: px[y][x] = PAL['k']
            elif dith(x, y, 0.55): px[y][x] = PAL['k']
    # trees line
    for i in range(14):
        tx = rnd.randint(4, w-8); ty = rnd.randint(86, 96); s = rnd.randint(4, 7)
        for dy in range(s):
            ww = max(1, (dy + 1) // 2)
            for dx in range(-ww, ww+1):
                if 0 <= tx+dx < w: px[ty+dy][tx+dx] = PAL['k']
        for dy in range(2): px[ty+s+dy][tx] = PAL['k']
    # houses
    def house(x, y, hw, hh):
        for yy in range(y, y+hh):
            for xx in range(x, x+hw):
                if 0 <= xx < w and 0 <= yy < h:
                    edge = xx in (x, x+hw-1) or yy in (y, y+hh-1)
                    px[yy][xx] = PAL['k'] if edge else PAL['w']
        for xx in range(x-3, x+hw+3):  # roof
            yy = y - 1 - min(3, min(xx-(x-3), (x+hw+2)-xx))
            if 0 <= xx < w and yy >= 0: px[yy][xx] = PAL['k']
        for wy in range(y+2, y+hh-2, 4):
            for wx in range(x+2, x+hw-2, 5):
                px[wy][wx] = PAL['k']; px[wy][wx+1] = PAL['k']; px[wy+1][wx] = PAL['k']; px[wy+1][wx+1] = PAL['k']
    house(18, 100, 34, 26); house(70, 108, 26, 18); house(210, 98, 40, 28); house(268, 110, 30, 16)
    # big house right
    house(150, 92, 44, 34)
    # ground
    for y in range(128, h):
        for x in range(w):
            t = 0.25 + 0.35 * (y - 128) / (h - 128)
            if dith(x, y, t): px[y][x] = PAL['k']
    # path
    for y in range(128, h):
        cx = w//2 + (y-128)//3
        for x in range(cx-14, cx+14):
            if 0 <= x < w and dith(x, y, 0.8): px[y][x] = PAL['w']
    return px

# ---------------- map ----------------
def citymap():
    s = 360
    px = [[PAL['b']]*s for _ in range(s)]
    rnd = random.Random(7)
    roads = [0, 72, 144, 216, 288, 359]
    for y in range(s):
        for x in range(s):
            px[y][x] = PAL['w']
    def is_road(x, y):
        for r in roads[1:-1]:
            if abs(x-r) <= 5 or abs(y-r) <= 5: return True
        return False
    for y in range(s):
        for x in range(s):
            if is_road(x, y):
                px[y][x] = PAL['w']
            else:
                px[y][x] = PAL['b']
    for r in roads[1:-1]:
        for v in range(s):
            for off in (-6, 6):
                if 0 <= r+off < s:
                    px[v][r+off] = PAL['k']; px[r+off][v] = PAL['k']
            if v % 8 < 4: px[v][r] = PAL['g']; px[r][v] = PAL['g']
    # blocks content
    for by in range(5):
        for bx in range(5):
            x0 = roads[bx]+8; y0 = roads[by]+8; x1 = roads[bx+1]-8; y1 = roads[by+1]-8
            if x1 <= x0 or y1 <= y0: continue
            if (bx+by) % 4 == 1:  # park
                for i in range(7):
                    tx = rnd.randint(x0+3, x1-4); ty = rnd.randint(y0+3, y1-4)
                    for dy in range(5):
                        ww = max(1, (dy+1)//2 + 1)
                        for dx in range(-ww, ww+1):
                            if x0 <= tx+dx < x1: px[ty+dy][tx+dx] = PAL['k']
                    px[ty+5][tx] = PAL['k']; px[ty+6][tx] = PAL['k']
                continue
            for i in range(rnd.randint(2, 4)):  # buildings
                bw = rnd.randint(14, 26); bh = rnd.randint(12, 22)
                x = rnd.randint(x0, max(x0, x1-bw)); y = rnd.randint(y0, max(y0, y1-bh))
                for yy in range(y, min(y1, y+bh)):
                    for xx in range(x, min(x1, x+bw)):
                        edge = xx in (x, x+bw-1) or yy in (y, y+bh-1)
                        px[yy][xx] = PAL['k'] if edge else (PAL['w'] if dith(xx, yy, 0.75) else PAL['b'])
                for yy in range(y+1, min(y1, y+bh)+2):  # shadow
                    xx = min(x1-1, x+bh+1)
                    if yy < s and dith(xx, yy, 0.5): px[yy][xx] = PAL['k']
    return px

def qr(size=84, m=21):
    cell = size // m
    px = [[PAL['w']]*size for _ in range(size)]
    rnd = random.Random(21)
    def finder(cx, cy):
        for y in range(7):
            for x in range(7):
                edge = x in (0, 6) or y in (0, 6) or (2 <= x <= 4 and 2 <= y <= 4)
                for yy in range(cell):
                    for xx in range(cell):
                        px[(cy+y)*cell+yy][(cx+x)*cell+xx] = PAL['k'] if edge else PAL['w']
    mods = [[rnd.random() < 0.45 for _ in range(m)] for _ in range(m)]
    for y in range(m):
        for x in range(m):
            if (x < 8 and y < 8) or (x > m-9 and y < 8) or (x < 8 and y > m-9): continue
            if mods[y][x]:
                for yy in range(cell):
                    for xx in range(cell):
                        px[y*cell+yy][x*cell+xx] = PAL['k']
    finder(0, 0); finder(m-7, 0); finder(0, m-7)
    return px

def sticker():
    s = 96
    px = [[PAL['.']]*s for _ in range(s)]
    for y in range(s):
        for x in range(s):
            if 4 <= x <= s-5 and 4 <= y <= s-5:
                edge = x in (4, s-5) or y in (4, s-5) or x in (6, s-7) or y in (6, s-7)
                px[y][x] = PAL['k'] if edge and (x in (4, s-5) or y in (4, s-5)) else PAL['w']
    d = digits("21", 8)
    for y, row in enumerate(d):
        for x, c in enumerate(row):
            px[28+y][24+x] = c
    # little head on top
    head = scaled(grid(["..kkkk..",".kkkkkk.",".k.kk.k.",".kkkkkk.","..kkkk.."]), 2)
    put(px, head, 38, 8)
    return px

# ---------------- emit ----------------
save("logo.png", digits("21", 6))
save("sticker.png", sticker())
save("qr.png", qr())
save("hero.png", hero())
save("map.png", citymap())
save("avatar.png", avatar())
save("robot.png", robot())

for n, g in [("nav-map","house"),("nav-book","book"),("nav-forum","chat"),("nav-profile","person"),
             ("ui-plus","plus"),("ui-minus","minus"),("ui-close","close"),("ui-search","search"),
             ("ui-filter","filter"),("ui-edit","edit"),("ui-send","send"),("ui-info","info"),
             ("ui-download","download"),("ui-arrowr","arrowr"),("ui-arrowl","arrowl"),("ui-check","check"),
             ("ui-lock","lock"),("ui-bell","bell"),
             ("ic-star","star"),("ic-heart","heart"),("ic-pin","pin"),("ic-clock","clock"),("ic-ruble","ruble"),
             ("t-bench","bench"),("t-trash","trash"),("t-sprout","sprout"),("t-lamp","lamp"),("t-drop","drop"),
             ("c-play","swing"),("c-tree","tree"),("c-bench","bench")]:
    save(n + ".png", scaled(grid(G[g]), 2))

for sid, g in [("water","drop"),("energy","bolt"),("food","apple"),("repair","hammer"),
               ("tools","tools"),("survival","tent"),("selforg","brain"),("reading","book")]:
    save(f"sec-{sid}.png", scaled(grid(G[g]), 3))
    save(f"badge-{sid}.png", badge(G[g]))

for bid, g in [("fire","fire"),("shelter","tent"),("wildwater","drop"),("wildfood","mush"),
               ("firstaid","cross"),("orient","compass"),("signal","signal"),("mind","face")]:
    save(f"badge-{bid}.png", badge(G[g]))

save("badge-enlightened.png", badge(G['sun']))
save("badge-volunteer.png", badge(G['flag']))

for iid, g in [("wrench","wrench"),("heart","heart"),("seed","seed"),("shield","shield"),
               ("lamp","lamp"),("star","star")]:
    save(f"item-{iid}.png", item(G[g]))

for mid, g in [("problem","close"),("task","tools"),("project","star"),("vote","check")]:
    save(f"mark-{mid}.png", marker(G[g]))

for i in range(9):
    save(f"p{i}.png", portrait(i))

save("acc-cap.png", grid(ACC_CAP))
save("acc-glasses.png", grid(ACC_GLASSES))
save("acc-flower.png", grid(ACC_FLOWER))

sig, wifi, batt = stbar()
save("st-sig.png", sig); save("st-wifi.png", wifi); save("st-batt.png", batt)
print("DONE", len(os.listdir(OUT)), "files")
