print("hi from python")

import speech_recognition as sr

# obtain audio from the microphone
r = sr.Recognizer()
with sr.Microphone() as source:
    audio = r.listen(source)

# recognize speech using Google Speech Recognition
try:
    formatted = r.recognize_google(audio).lower().replace(' ', ',')
    print(formatted)
except sr.UnknownValueError:
    # '!' is unique error character. Check for '!' in JavaScript to handle errors.
    print("!Error: Google Speech Recognition could not recognize audio.")
except sr.RequestError as e:
    print("!Error: Could not request results from Google Speech Recognition service; {0}".format(e))