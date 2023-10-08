import re
import os

jsTable = []
cnt = 0
for r, fds, fs in os.walk('Sky'):
    for f in fs:
        cnt += 1
        fid = f.split('.')[0]
        sp = " ".join(re.findall('[A-Z][^A-Z]*', fid))
        print("{{\n"\
                "  SelectorTitle:\"{}\",\n"\
                "  SkyPath:\"./Sky/{}\",\n"\
                "  AudioPath:\"./AudioFiles/{}.mp3\",\n"\
                "  TextContent:\"{}\"\n"\
                "}},".format(cnt, f, fid, sp))
