// Init SpeacSynth API
const synth = window.speechSynthesis


const textForm = document.querySelector('form')
const textInput = document.querySelector('#text-input')
const voiceSelect = document.querySelector('#voice-select')
const rate = document.querySelector('#rate')
const rateValue = document.querySelector('#rate-value')
const pitch = document.querySelector('#pitch')
const pitchValue = document.querySelector('#pitch-value')

// Init voices array
let voices = []

const getVoices = () => {
  voices = synth.getVoices()

  // Loop trough voices and create option for each voice
  voices.forEach(voice => {
    // Create option
    const option = document.createElement('option')
    // Fill option with voice and language
    option.textContent = voice.name + '(' + voice.lang + ')'

    // Set needed option attributes
    option.setAttribute('data-lang', voice.lang)
    option.setAttribute('data-name', voice.name)

    voiceSelect.appendChild(option)
  })
}

getVoices()
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices
}

// Speak
const speak = () => {
  if (synth.speaking) {
    console.log("Already speaking...");
    return
  }
  if (textInput.value !== '') {
    // Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value)

    // Speak end
    speakText.onend = e => {
      console.log("Done speaking...");
    }

    // Speak error
    speakText.onerror = e => {
      console.error("Something went wrong");
    }

    // Selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name')
    // Loop trough voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice
      }
    })
    // Set pitch and rate
    speakText.rate = rate.value
    speakText.pitch = pitch.value
    // Speak
    synth.speak(speakText)
  }
}

// EVENT LISTENER

// Text form submit
textForm.addEventListener('submit', e => {
  e.preventDefault()
  speak()
  textInput.blur()
})

// Rate value change
rate.addEventListener('change', e => rateValue.textContent = rate.value)
// Pitch value change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value)

// Voice value change
voiceSelect.addEventListener('change', e => speak())