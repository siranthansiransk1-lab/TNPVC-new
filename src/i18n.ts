import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "Join Our Community": "Join Our Community",
      "Connect with fellow PVC professionals": "Connect with fellow PVC professionals and get project leads directly on WhatsApp.",
      "Select the groups you'd like to join": "Select the groups you'd like to join",
      "All India Community": "All India Community",
      "National trade network": "National trade network",
      "Local TNPVC Community": "Local TNPVC Community",
      "Regional support & leads": "Regional support & leads",
      "Join on WhatsApp": "Join on WhatsApp",
      "Not now": "Not now"
    }
  },
  ta: {
    translation: {
      "Join Our Community": "நமது சமூகத்தில் இணையுங்கள்",
      "Connect with fellow PVC professionals": "PVC நிபுணர்களுடன் இணைந்து WhatsApp மூலம் திட்டங்களைப் பெறுங்கள்.",
      "Select the groups you'd like to join": "நீங்கள் இணைய விரும்பும் குழுக்களைத் தேர்ந்தெடுக்கவும்",
      "All India Community": "அனைத்திந்திய சமூகம்",
      "National trade network": "தேசிய வர்த்தக நெட்வொர்க்",
      "Local TNPVC Community": "உள்ளூர் TNPVC சமூகம்",
      "Regional support & leads": "பிராந்திய ஆதரவு மற்றும் லீட்கள்",
      "Join on WhatsApp": "WhatsApp-இல் இணையுங்கள்",
      "Not now": "இப்போது இல்லை"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
