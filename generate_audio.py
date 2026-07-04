#!/usr/bin/env python3
"""
Generate the app's voice clips with Google Cloud Text-to-Speech.

Creates one MP3 per spoken string (every sight word, its sentence, each
phonics part, and every maths question) using the voice
en-US-Chirp3-HD-Puck, plus audio/manifest.json mapping the exact text to
its file. The web app plays these clips and automatically falls back to
the device's own voice for anything that has no clip.

The strings are read straight out of script.js, so this stays in sync:
add or edit words/questions there, re-run this, done.

====================================================================
AUTH — pick ONE. (Option A is easiest and needs no installs.)
====================================================================

Option A — API key  (recommended; works even when your organisation
                     blocks service-account keys)
  1. Google Cloud console -> APIs & Services -> Credentials ->
     Create credentials -> API key.  Copy the key (starts "AIza...").
     (Optional but nice: click the key -> Restrict key ->
      "Cloud Text-to-Speech API".)
  2. Make sure the "Cloud Text-to-Speech API" is enabled for the project.
  3. In Terminal, from this folder:
        export GOOGLE_API_KEY="AIza...your key..."
        python3 generate_audio.py
     (No pip install needed for this path.)

Option B — your own login via gcloud (Application Default Credentials)
  1. Install gcloud:  https://cloud.google.com/sdk/docs/install
  2. gcloud auth application-default login
     gcloud auth application-default set-quota-project YOUR_PROJECT_ID
  3. pip3 install google-cloud-texttospeech
     python3 generate_audio.py

====================================================================
RUN  (from this project folder)
====================================================================
        python3 generate_audio.py

It only creates clips that are missing, so re-running is cheap.
To force a full rebuild (e.g. after changing the voice), delete the
audio/ folder first, then commit the audio/ folder and push.
"""

import os
import re
import json
import time
import base64
import hashlib

VOICE = "en-US-Chirp3-HD-Puck"
LANG = "en-US"

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "script.js")
OUT = os.path.join(HERE, "audio")


def collect_strings():
    """Pull every spoken string out of script.js, in order, de-duplicated."""
    with open(SRC, encoding="utf-8") as f:
        src = f.read()

    found = []
    # single-value keys: w (word), s (sentence), q (maths question)
    for key in ("w", "s", "q"):
        found += re.findall(r'\b%s:\s*"((?:[^"\\]|\\.)*)"' % key, src)
    # phonics part arrays:  p: ["a", "b"]
    for arr in re.findall(r'\bp:\s*\[([^\]]*)\]', src):
        found += re.findall(r'"((?:[^"\\]|\\.)*)"', arr)

    seen, out = set(), []
    for t in found:
        if "\\" in t:                       # decode any JS escapes
            t = t.encode("utf-8").decode("unicode_escape")
        t = t.strip()
        if t and t not in seen:
            seen.add(t)
            out.append(t)
    return out


def clip_name(text):
    return "c_" + hashlib.sha1(text.encode("utf-8")).hexdigest()[:16]


# ---- two ways to synthesise one string -> MP3 bytes ------------------

def make_synth():
    """Return a function synth(text) -> mp3 bytes, choosing the auth mode."""
    api_key = os.environ.get("GOOGLE_API_KEY")

    if api_key:
        import ssl
        import urllib.request
        # macOS python.org builds ship without CA certs; use certifi's bundle
        # if available so HTTPS verification works.
        try:
            import certifi
            ctx = ssl.create_default_context(cafile=certifi.where())
        except ImportError:
            ctx = ssl.create_default_context()
        url = ("https://texttospeech.googleapis.com/v1/text:synthesize?key="
               + api_key)

        def synth(text):
            body = json.dumps({
                "input": {"text": text},
                "voice": {"languageCode": LANG, "name": VOICE},
                "audioConfig": {"audioEncoding": "MP3"},
            }).encode("utf-8")
            req = urllib.request.Request(
                url, data=body, headers={"Content-Type": "application/json"})
            with urllib.request.urlopen(req, context=ctx) as r:
                data = json.loads(r.read().decode("utf-8"))
            return base64.b64decode(data["audioContent"])

        print("Auth: API key (GOOGLE_API_KEY)")
        return synth

    # Fall back to the client library + Application Default Credentials.
    from google.cloud import texttospeech
    client = texttospeech.TextToSpeechClient()
    voice = texttospeech.VoiceSelectionParams(language_code=LANG, name=VOICE)
    cfg = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3)

    def synth(text):
        resp = client.synthesize_speech(
            input=texttospeech.SynthesisInput(text=text),
            voice=voice, audio_config=cfg)
        return resp.audio_content

    print("Auth: Application Default Credentials (gcloud login)")
    return synth


def main():
    os.makedirs(OUT, exist_ok=True)
    strings = collect_strings()
    total_chars = sum(len(t) for t in strings)
    print("Voice:  %s" % VOICE)
    print("Strings to voice: %d  (~%d characters, one-time)" %
          (len(strings), total_chars))

    synth = make_synth()

    manifest, made, skipped = {}, 0, 0
    for text in strings:
        name = clip_name(text)
        manifest[text] = name
        path = os.path.join(OUT, name + ".mp3")
        if os.path.exists(path):
            skipped += 1
            continue
        for attempt in range(3):
            try:
                audio = synth(text)
                break
            except Exception as e:                       # simple retry
                if attempt == 2:
                    raise
                print("  retry (%s): %r" % (text[:30], e))
                time.sleep(2)
        with open(path, "wb") as fh:
            fh.write(audio)
        made += 1
        if made % 25 == 0:
            print("  ...%d generated" % made)
        time.sleep(0.05)                                 # be gentle on quota

    with open(os.path.join(OUT, "manifest.json"), "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, ensure_ascii=False)

    print("Done.  %d new clip(s), %d already existed." % (made, skipped))
    print("Wrote audio/manifest.json with %d entries." % len(manifest))
    print("Next:  git add audio && git commit -m 'Add voice clips' && git push")


if __name__ == "__main__":
    main()
