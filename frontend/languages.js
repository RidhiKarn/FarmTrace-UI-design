// Comprehensive Language Support for FarmTrace
// 22 Official Indian Languages + Hindi + English = 24 Languages

const SUPPORTED_LANGUAGES = {
    en: {
        name: "English",
        nativeName: "English",
        code: "en-IN",
        direction: "ltr",
        voiceCode: "en-IN"
    },
    hi: {
        name: "Hindi",
        nativeName: "हिन्दी",
        code: "hi-IN",
        direction: "ltr",
        voiceCode: "hi-IN"
    },
    as: {
        name: "Assamese",
        nativeName: "অসমীয়া",
        code: "as-IN",
        direction: "ltr",
        voiceCode: "as-IN"
    },
    bn: {
        name: "Bengali",
        nativeName: "বাংলা",
        code: "bn-IN",
        direction: "ltr",
        voiceCode: "bn-IN"
    },
    gu: {
        name: "Gujarati",
        nativeName: "ગુજરાતી",
        code: "gu-IN",
        direction: "ltr",
        voiceCode: "gu-IN"
    },
    kn: {
        name: "Kannada",
        nativeName: "ಕನ್ನಡ",
        code: "kn-IN",
        direction: "ltr",
        voiceCode: "kn-IN"
    },
    ml: {
        name: "Malayalam",
        nativeName: "മലയാളം",
        code: "ml-IN",
        direction: "ltr",
        voiceCode: "ml-IN"
    },
    mr: {
        name: "Marathi",
        nativeName: "मराठी",
        code: "mr-IN",
        direction: "ltr",
        voiceCode: "mr-IN"
    },
    or: {
        name: "Odia",
        nativeName: "ଓଡ଼ିଆ",
        code: "or-IN",
        direction: "ltr",
        voiceCode: "or-IN"
    },
    pa: {
        name: "Punjabi",
        nativeName: "ਪੰਜਾਬੀ",
        code: "pa-IN",
        direction: "ltr",
        voiceCode: "pa-IN"
    },
    ta: {
        name: "Tamil",
        nativeName: "தமிழ்",
        code: "ta-IN",
        direction: "ltr",
        voiceCode: "ta-IN"
    },
    te: {
        name: "Telugu",
        nativeName: "తెలుగు",
        code: "te-IN",
        direction: "ltr",
        voiceCode: "te-IN"
    },
    ur: {
        name: "Urdu",
        nativeName: "اردو",
        code: "ur-IN",
        direction: "rtl",
        voiceCode: "ur-IN"
    },
    bh: {
        name: "Bodo",
        nativeName: "बर'",
        code: "bh-IN",
        direction: "ltr",
        voiceCode: "hi-IN" // Fallback to Hindi
    },
    doi: {
        name: "Dogri",
        nativeName: "डोगरी",
        code: "doi-IN",
        direction: "ltr",
        voiceCode: "hi-IN"
    },
    ks: {
        name: "Kashmiri",
        nativeName: "कॉशुर",
        code: "ks-IN",
        direction: "ltr",
        voiceCode: "hi-IN"
    },
    kok: {
        name: "Konkani",
        nativeName: "कोंकणी",
        code: "kok-IN",
        direction: "ltr",
        voiceCode: "hi-IN"
    },
    mai: {
        name: "Maithili",
        nativeName: "मैथिली",
        code: "mai-IN",
        direction: "ltr",
        voiceCode: "hi-IN"
    },
    mni: {
        name: "Manipuri",
        nativeName: "ꯃꯤꯇꯩ ꯂꯣꯟ",
        code: "mni-IN",
        direction: "ltr",
        voiceCode: "hi-IN"
    },
    ne: {
        name: "Nepali",
        nativeName: "नेपाली",
        code: "ne-IN",
        direction: "ltr",
        voiceCode: "ne-NP"
    },
    sa: {
        name: "Sanskrit",
        nativeName: "संस्कृतम्",
        code: "sa-IN",
        direction: "ltr",
        voiceCode: "hi-IN"
    },
    sat: {
        name: "Santali",
        nativeName: "ᱥᱟᱱᱛᱟᱲᱤ",
        code: "sat-IN",
        direction: "ltr",
        voiceCode: "hi-IN"
    },
    sd: {
        name: "Sindhi",
        nativeName: "سنڌي",
        code: "sd-IN",
        direction: "rtl",
        voiceCode: "hi-IN"
    }
};

const TRANSLATIONS = {
    en: {
        // Header and Navigation
        appName: "FarmTrace",
        welcome: "Welcome to FarmTrace",
        dashboard: "Dashboard",
        profile: "Profile",
        kyc: "KYC Documents",
        products: "Products",
        transactions: "Transactions",
        analytics: "Analytics",
        logout: "Logout",

        // Voice Accessibility
        voiceMode: "Voice Mode",
        enableVoice: "Enable Voice Assistant",
        disableVoice: "Disable Voice Assistant",
        speakText: "Speak this text",
        listenMode: "Listening...",
        voiceInstructions: "Voice Instructions",

        // Authentication
        signIn: "Sign In",
        signUp: "Sign Up",
        email: "Email Address",
        password: "Password",
        userType: "User Type",
        createAccount: "Create Account",
        loginSuccess: "Login successful! Welcome back.",
        registerSuccess: "Registration successful! Welcome to FarmTrace.",

        // User Types
        farmer: "Farmer",
        middleman: "Middleman/Trader",
        fieldAgent: "Field Agent",
        transporter: "Transporter",
        retailer: "Retailer",
        consumer: "Consumer",
        corporateBuyer: "Corporate Buyer",
        bank: "Bank Officer",
        mandiOfficial: "Mandi Official",
        government: "Government Officer",
        certificationBody: "Certification Body",

        // Profile Form
        fullName: "Full Name",
        phoneNumber: "Phone Number",
        farmAddress: "Farm Address",
        farmSize: "Farm Size (hectares)",
        primaryCrops: "Primary Crops",
        farmingExperience: "Farming Experience (years)",
        aadhaarNumber: "Aadhaar Number",
        panNumber: "PAN Number",
        bankAccount: "Bank Account Number",
        ifscCode: "IFSC Code",
        saveProfile: "Save Profile",

        // KYC Documents
        kycDocuments: "KYC Documents",
        uploadDocuments: "Upload Documents",
        aadhaarCard: "Aadhaar Card",
        panCard: "PAN Card",
        landRecords: "Land Records/Ownership Documents",
        bankPassbook: "Bank Passbook/Statement",
        farmingCertificates: "Farming Certificates (Optional)",
        profilePhoto: "Profile Photo",
        uploadInstructions: "Upload clear, high-quality images or PDFs of your documents. Maximum file size: 10MB per document.",
        clickToUpload: "Click to upload",
        dragAndDrop: "or drag and drop here",
        supportedFormats: "Supported: JPG, PNG, PDF",
        uploadSuccess: "File uploaded successfully",
        uploadFailed: "Upload failed. Please try again.",

        // Products
        myProducts: "My Products",
        addNewProduct: "Add New Product",
        productName: "Product Name",
        variety: "Variety",
        quantity: "Quantity (kg)",
        pricePerKg: "Price per kg (₹)",
        qualityGrade: "Quality Grade",
        harvestDate: "Harvest Date",
        organicProduct: "Organic Product",
        description: "Description",
        productImage: "Product Image",
        addProduct: "Add Product",
        totalValue: "Total Value",
        qrCode: "QR Code",

        // Voice Instructions
        voiceWelcome: "Welcome to FarmTrace voice assistant. I can help you navigate and fill forms using voice commands.",
        voiceRegisterInstructions: "To register, say your email address, then your password, then select your user type from farmer, middleman, or other options.",
        voiceProfileInstructions: "I will guide you through filling your profile. Please speak clearly after each prompt.",
        voiceKycInstructions: "I will help you upload your KYC documents. You can say 'upload aadhaar card' or similar commands.",
        voiceProductInstructions: "Let me help you add a new product. Please provide product details when prompted.",

        // Common Actions
        save: "Save",
        cancel: "Cancel",
        submit: "Submit",
        edit: "Edit",
        delete: "Delete",
        view: "View",
        download: "Download",
        upload: "Upload",
        next: "Next",
        previous: "Previous",
        confirm: "Confirm",

        // Status Messages
        loading: "Loading...",
        saving: "Saving...",
        uploading: "Uploading...",
        success: "Success",
        error: "Error",
        warning: "Warning",
        info: "Information",

        // Accessibility
        readAloud: "Read Aloud",
        voiceInput: "Voice Input",
        increaseTextSize: "Increase Text Size",
        decreaseTextSize: "Decrease Text Size",
        highContrast: "High Contrast Mode",
        normalContrast: "Normal Contrast Mode"
    },

    hi: {
        // Header and Navigation
        appName: "फार्मट्रेस",
        welcome: "फार्मट्रेस में आपका स्वागत है",
        dashboard: "डैशबोर्ड",
        profile: "प्रोफाइल",
        kyc: "केवाईसी दस्तावेज़",
        products: "उत्पाद",
        transactions: "लेन-देन",
        analytics: "विश्लेषण",
        logout: "लॉग आउट",

        // Voice Accessibility
        voiceMode: "आवाज़ मोड",
        enableVoice: "आवाज़ सहायक चालू करें",
        disableVoice: "आवाज़ सहायक बंद करें",
        speakText: "यह टेक्स्ट बोलें",
        listenMode: "सुन रहा है...",
        voiceInstructions: "आवाज़ निर्देश",

        // Authentication
        signIn: "साइन इन",
        signUp: "साइन अप",
        email: "ईमेल पता",
        password: "पासवर्ड",
        userType: "उपयोगकर्ता प्रकार",
        createAccount: "खाता बनाएं",
        loginSuccess: "लॉगिन सफल! वापस आपका स्वागत है।",
        registerSuccess: "पंजीकरण सफल! फार्मट्रेस में आपका स्वागत है।",

        // User Types
        farmer: "किसान",
        middleman: "बिचौलिया/व्यापारी",
        fieldAgent: "फील्ड एजेंट",
        transporter: "परिवहनकर्ता",
        retailer: "खुदरा विक्रेता",
        consumer: "उपभोक्ता",
        corporateBuyer: "कॉर्पोरेट खरीदार",
        bank: "बैंक अधिकारी",
        mandiOfficial: "मंडी अधिकारी",
        government: "सरकारी अधिकारी",
        certificationBody: "प्रमाणन निकाय",

        // Profile Form
        fullName: "पूरा नाम",
        phoneNumber: "फोन नंबर",
        farmAddress: "खेत का पता",
        farmSize: "खेत का आकार (हेक्टेयर)",
        primaryCrops: "मुख्य फसलें",
        farmingExperience: "खेती का अनुभव (वर्ष)",
        aadhaarNumber: "आधार नंबर",
        panNumber: "पैन नंबर",
        bankAccount: "बैंक खाता संख्या",
        ifscCode: "आईएफएससी कोड",
        saveProfile: "प्रोफाइल सेव करें",

        // KYC Documents
        kycDocuments: "केवाईसी दस्तावेज़",
        uploadDocuments: "दस्तावेज़ अपलोड करें",
        aadhaarCard: "आधार कार्ड",
        panCard: "पैन कार्ड",
        landRecords: "भूमि रिकॉर्ड/स्वामित्व दस्तावेज़",
        bankPassbook: "बैंक पासबुक/स्टेटमेंट",
        farmingCertificates: "खेती प्रमाणपत्र (वैकल्पिक)",
        profilePhoto: "प्रोफाइल फोटो",
        uploadInstructions: "अपने दस्तावेज़ों की स्पष्ट, उच्च गुणवत्ता वाली तस्वीरें या पीडीएफ अपलोड करें। अधिकतम फाइल साइज़: 10एमबी प्रति दस्तावेज़।",
        clickToUpload: "अपलोड करने के लिए क्लिक करें",
        dragAndDrop: "या यहाँ खींचें और छोड़ें",
        supportedFormats: "समर्थित: JPG, PNG, PDF",
        uploadSuccess: "फाइल सफलतापूर्वक अपलोड हुई",
        uploadFailed: "अपलोड असफल। कृपया पुनः प्रयास करें।",

        // Products
        myProducts: "मेरे उत्पाद",
        addNewProduct: "नया उत्पाद जोड़ें",
        productName: "उत्पाद का नाम",
        variety: "किस्म",
        quantity: "मात्रा (किलो)",
        pricePerKg: "प्रति किलो मूल्य (₹)",
        qualityGrade: "गुणवत्ता ग्रेड",
        harvestDate: "फसल की तारीख",
        organicProduct: "जैविक उत्पाद",
        description: "विवरण",
        productImage: "उत्पाद की तस्वीर",
        addProduct: "उत्पाद जोड़ें",
        totalValue: "कुल मूल्य",
        qrCode: "क्यूआर कोड",

        // Voice Instructions
        voiceWelcome: "फार्मट्रेस आवाज़ सहायक में आपका स्वागत है। मैं आवाज़ कमांड का उपयोग करके नेविगेट करने और फॉर्म भरने में आपकी मदद कर सकता हूँ।",
        voiceRegisterInstructions: "पंजीकरण के लिए, अपना ईमेल पता कहें, फिर अपना पासवर्ड, फिर किसान, बिचौलिया या अन्य विकल्पों में से अपना उपयोगकर्ता प्रकार चुनें।",
        voiceProfileInstructions: "मैं आपकी प्रोफाइल भरने में आपका मार्गदर्शन करूंगा। कृपया प्रत्येक प्रॉम्प्ट के बाद स्पष्ट रूप से बोलें।",
        voiceKycInstructions: "मैं आपके केवाईसी दस्तावेज़ अपलोड करने में आपकी मदद करूंगा। आप 'आधार कार्ड अपलोड करें' या इसी तरह के कमांड कह सकते हैं।",
        voiceProductInstructions: "मैं आपको नया उत्पाद जोड़ने में मदद करूंगा। कृपया संकेत मिलने पर उत्पाद विवरण प्रदान करें।",

        // Common Actions
        save: "सेव करें",
        cancel: "रद्द करें",
        submit: "जमा करें",
        edit: "संपादित करें",
        delete: "हटाएं",
        view: "देखें",
        download: "डाउनलोड करें",
        upload: "अपलोड करें",
        next: "अगला",
        previous: "पिछला",
        confirm: "पुष्टि करें",

        // Status Messages
        loading: "लोड हो रहा है...",
        saving: "सेव हो रहा है...",
        uploading: "अपलोड हो रहा है...",
        success: "सफलता",
        error: "त्रुटि",
        warning: "चेतावनी",
        info: "जानकारी",

        // Accessibility
        readAloud: "जोर से पढ़ें",
        voiceInput: "आवाज़ इनपुट",
        increaseTextSize: "टेक्स्ट साइज़ बढ़ाएं",
        decreaseTextSize: "टेक्स्ट साइज़ घटाएं",
        highContrast: "हाई कंट्रास्ट मोड",
        normalContrast: "सामान्य कंट्रास्ट मोड"
    },

    // Add more languages as needed...
    // For demo purposes, I'll add a few key regional languages

    ta: {
        appName: "ஃபார்ம்ட்ரேஸ்",
        welcome: "ஃபார்ம்ட்ரேஸ்க்கு வரவேற்கிறோம்",
        farmer: "விவசாயி",
        signIn: "உள்நுழையவும்",
        signUp: "பதிவு செய்யவும்",
        fullName: "முழு பெயர்",
        phoneNumber: "தொலைபேசி எண்",
        farmAddress: "பண்ணை முகவரி",
        saveProfile: "சுயவிவரத்தை சேமிக்கவும்",
        voiceMode: "குரல் பயன்முறை",
        enableVoice: "குரல் உதவியாளரை இயக்கவும்",
        voiceWelcome: "ஃபார்ம்ட்ரேஸ் குரல் உதவியாளருக்கு வரவேற்கிறோம். குரல் கட்டளைகளைப் பயன்படுத்தி வழிசெலுத்தவும் படிவங்களை நிரப்பவும் உங்களுக்கு உதவ முடியும்."
    },

    te: {
        appName: "ఫార్మ్‌ట్రేస్",
        welcome: "ఫార్మ్‌ట్రేస్‌కు స్వాగతం",
        farmer: "రైతు",
        signIn: "సైన్ ఇన్ చేయండి",
        signUp: "సైన్ అప్ చేయండి",
        fullName: "పూర్తి పేరు",
        phoneNumber: "ఫోన్ నంబర్",
        farmAddress: "వ్యవసాయ చిరునామా",
        saveProfile: "ప్రొఫైల్ సేవ్ చేయండి",
        voiceMode: "వాయిస్ మోడ్",
        enableVoice: "వాయిస్ అసిస్టెంట్‌ను ప్రారంభించండి",
        voiceWelcome: "ఫార్మ్‌ట్రేస్ వాయిస్ అసిస్టెంట్‌కు స్వాగతం. వాయిస్ కమాండ్‌లను ఉపయోగించి నావిగేట్ చేయడానికి మరియు ఫారమ్‌లను పూరించడానికి నేను మీకు సహాయం చేయగలను."
    },

    kn: {
        appName: "ಫಾರ್ಮ್‌ಟ್ರೇಸ್",
        welcome: "ಫಾರ್ಮ್‌ಟ್ರೇಸ್‌ಗೆ ಸ್ವಾಗತ",
        farmer: "ರೈತ",
        signIn: "ಸೈನ್ ಇನ್ ಮಾಡಿ",
        signUp: "ಸೈನ್ ಅಪ್ ಮಾಡಿ",
        fullName: "ಪೂರ್ಣ ಹೆಸರು",
        phoneNumber: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
        farmAddress: "ಕೃಷಿ ವಿಳಾಸ",
        saveProfile: "ಪ್ರೊಫೈಲ್ ಉಳಿಸಿ",
        voiceMode: "ಧ್ವನಿ ಕ್ರಮ",
        enableVoice: "ಧ್ವನಿ ಸಹಾಯಕವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ",
        voiceWelcome: "ಫಾರ್ಮ್‌ಟ್ರೇಸ್ ಧ್ವನಿ ಸಹಾಯಕಕ್ಕೆ ಸ್ವಾಗತ. ಧ್ವನಿ ಆಜ್ಞೆಗಳನ್ನು ಬಳಸಿಕೊಂಡು ನ್ಯಾವಿಗೇಟ್ ಮಾಡಲು ಮತ್ತು ಫಾರ್ಮ್‌ಗಳನ್ನು ಭರ್ತಿ ಮಾಡಲು ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ."
    },

    ml: {
        appName: "ഫാം ട്രേസ്",
        welcome: "ഫാം ട്രേസിലേക്ക് സ്വാഗതം",
        farmer: "കർഷകൻ",
        signIn: "സൈൻ ഇൻ ചെയ്യുക",
        signUp: "സൈൻ അപ്പ് ചെയ്യുക",
        fullName: "പൂർണ്ണ നാമം",
        phoneNumber: "ഫോൺ നമ്പർ",
        farmAddress: "കൃഷി വിലാസം",
        saveProfile: "പ്രൊഫൈൽ സേവ് ചെയ്യുക",
        voiceMode: "വോയ്സ് മോഡ്",
        enableVoice: "വോയ്സ് അസിസ്റ്റന്റ് പ്രവർത്തനക്ഷമമാക്കുക",
        voiceWelcome: "ഫാം ട്രേസ് വോയ്സ് അസിസ്റ്റന്റിലേക്ക് സ്വാഗതം. വോയ്സ് കമാൻഡുകൾ ഉപയോഗിച്ച് നാവിഗേറ്റ് ചെയ്യാനും ഫോമുകൾ പൂരിപ്പിക്കാനും എനിക്ക് നിങ്ങളെ സഹായിക്കാനാകും."
    },

    gu: {
        appName: "ફાર્મટ્રેસ",
        welcome: "ફાર્મટ્રેસમાં આપનું સ્વાગત છે",
        farmer: "ખેડૂત",
        signIn: "સાઇન ઇન કરો",
        signUp: "સાઇન અપ કરો",
        fullName: "સંપૂર્ણ નામ",
        phoneNumber: "ફોન નંબર",
        farmAddress: "ખેતરનું સરનામું",
        saveProfile: "પ્રોફાઇલ સેવ કરો",
        voiceMode: "વૉઇસ મોડ",
        enableVoice: "વૉઇસ આસિસ્ટન્ટ સક્રિય કરો",
        voiceWelcome: "ફાર્મટ્રેસ વૉઇસ આસિસ્ટન્ટમાં આપનું સ્વાગત છે. વૉઇસ કમાન્ડનો ઉપયોગ કરીને નેવિગેટ કરવા અને ફોર્મ ભરવા માટે હું તમારી મદદ કરી શકું છું."
    },

    pa: {
        appName: "ਫਾਰਮਟ੍ਰੇਸ",
        welcome: "ਫਾਰਮਟ੍ਰੇਸ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ",
        farmer: "ਕਿਸਾਨ",
        signIn: "ਸਾਈਨ ਇਨ ਕਰੋ",
        signUp: "ਸਾਈਨ ਅਪ ਕਰੋ",
        fullName: "ਪੂਰਾ ਨਾਮ",
        phoneNumber: "ਫੋਨ ਨੰਬਰ",
        farmAddress: "ਖੇਤ ਦਾ ਪਤਾ",
        saveProfile: "ਪ੍ਰੋਫਾਈਲ ਸੇਵ ਕਰੋ",
        voiceMode: "ਆਵਾਜ਼ ਮੋਡ",
        enableVoice: "ਵੌਇਸ ਅਸਿਸਟੈਂਟ ਸਮਰਥ ਕਰੋ",
        voiceWelcome: "ਫਾਰਮਟ੍ਰੇਸ ਵੌਇਸ ਅਸਿਸਟੈਂਟ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਵੌਇਸ ਕਮਾਂਡਾਂ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਨੈਵੀਗੇਟ ਕਰਨ ਅਤੇ ਫਾਰਮ ਭਰਨ ਵਿੱਚ ਮੈਂ ਤੁਹਾਡੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ।"
    },

    bn: {
        appName: "ফার্মট্রেস",
        welcome: "ফার্মট্রেসে আপনাকে স্বাগতম",
        farmer: "কৃষক",
        signIn: "সাইন ইন করুন",
        signUp: "সাইন আপ করুন",
        fullName: "পূর্ণ নাম",
        phoneNumber: "ফোন নম্বর",
        farmAddress: "খামারের ঠিকানা",
        saveProfile: "প্রোফাইল সেভ করুন",
        voiceMode: "ভয়েস মোড",
        enableVoice: "ভয়েস অ্যাসিস্ট্যান্ট সক্রিয় করুন",
        voiceWelcome: "ফার্মট্রেস ভয়েস অ্যাসিস্ট্যান্টে আপনাকে স্বাগতম। ভয়েস কমান্ড ব্যবহার করে নেভিগেট করতে এবং ফর্ম পূরণ করতে আমি আপনাকে সাহায্য করতে পারি।"
    }
};

// Language Manager Class
class LanguageManager {
    constructor() {
        this.currentLanguage = 'en';
        this.isVoiceEnabled = false;
        this.speechSynthesis = window.speechSynthesis;
        this.speechRecognition = null;
        this.isListening = false;

        // Initialize Speech Recognition
        this.initializeSpeechRecognition();

        // Load saved language preference
        const savedLang = localStorage.getItem('farmtrace_language');
        if (savedLang && SUPPORTED_LANGUAGES[savedLang]) {
            this.setLanguage(savedLang);
        }

        // Load voice preference
        const voiceEnabled = localStorage.getItem('farmtrace_voice_enabled');
        if (voiceEnabled === 'true') {
            this.enableVoice();
        }
    }

    initializeSpeechRecognition() {
        if ('webkitSpeechRecognition' in window) {
            this.speechRecognition = new webkitSpeechRecognition();
        } else if ('SpeechRecognition' in window) {
            this.speechRecognition = new SpeechRecognition();
        }

        if (this.speechRecognition) {
            this.speechRecognition.continuous = false;
            this.speechRecognition.interimResults = false;
            this.speechRecognition.maxAlternatives = 1;
        }
    }

    setLanguage(langCode) {
        if (!SUPPORTED_LANGUAGES[langCode]) {
            console.warn(`Language ${langCode} not supported`);
            return;
        }

        this.currentLanguage = langCode;
        localStorage.setItem('farmtrace_language', langCode);

        // Update speech recognition language
        if (this.speechRecognition) {
            this.speechRecognition.lang = SUPPORTED_LANGUAGES[langCode].code;
        }

        // Update page direction for RTL languages
        document.dir = SUPPORTED_LANGUAGES[langCode].direction;

        // Trigger language change event
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: langCode }
        }));

        this.updateUI();
    }

    getText(key) {
        const translation = TRANSLATIONS[this.currentLanguage];
        return translation && translation[key] ? translation[key] : TRANSLATIONS.en[key] || key;
    }

    speak(text, options = {}) {
        if (!this.isVoiceEnabled || !this.speechSynthesis) return;

        // Cancel any ongoing speech
        this.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = SUPPORTED_LANGUAGES[this.currentLanguage].voiceCode;
        utterance.rate = options.rate || 0.9;
        utterance.pitch = options.pitch || 1;
        utterance.volume = options.volume || 1;

        // Try to find appropriate voice
        const voices = this.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice =>
            voice.lang.startsWith(SUPPORTED_LANGUAGES[this.currentLanguage].voiceCode.substring(0, 2))
        );

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        this.speechSynthesis.speak(utterance);

        return new Promise((resolve) => {
            utterance.onend = resolve;
            utterance.onerror = resolve;
        });
    }

    startListening(callback) {
        if (!this.speechRecognition || this.isListening) return;

        this.isListening = true;

        this.speechRecognition.onresult = (event) => {
            const result = event.results[0][0].transcript;
            callback(result);
            this.isListening = false;
        };

        this.speechRecognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.isListening = false;
            callback(null, event.error);
        };

        this.speechRecognition.onend = () => {
            this.isListening = false;
        };

        this.speechRecognition.start();
    }

    stopListening() {
        if (this.speechRecognition && this.isListening) {
            this.speechRecognition.stop();
            this.isListening = false;
        }
    }

    enableVoice() {
        this.isVoiceEnabled = true;
        localStorage.setItem('farmtrace_voice_enabled', 'true');

        // Announce voice mode enabled
        this.speak(this.getText('voiceWelcome'));

        // Update UI
        document.dispatchEvent(new CustomEvent('voiceStateChanged', {
            detail: { enabled: true }
        }));
    }

    disableVoice() {
        this.isVoiceEnabled = false;
        localStorage.setItem('farmtrace_voice_enabled', 'false');

        // Stop any ongoing speech
        if (this.speechSynthesis) {
            this.speechSynthesis.cancel();
        }

        // Stop listening
        this.stopListening();

        // Update UI
        document.dispatchEvent(new CustomEvent('voiceStateChanged', {
            detail: { enabled: false }
        }));
    }

    updateUI() {
        // Update all text elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = this.getText(key);
        });

        // Update placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            element.placeholder = this.getText(key);
        });

        // Update values
        document.querySelectorAll('[data-translate-value]').forEach(element => {
            const key = element.getAttribute('data-translate-value');
            element.value = this.getText(key);
        });

        // Update titles
        document.querySelectorAll('[data-translate-title]').forEach(element => {
            const key = element.getAttribute('data-translate-title');
            element.title = this.getText(key);
        });
    }

    createLanguageSelector() {
        const selector = document.createElement('select');
        selector.className = 'language-selector';
        selector.style.cssText = `
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            background: white;
            font-size: 0.9rem;
            margin-right: 1rem;
        `;

        Object.keys(SUPPORTED_LANGUAGES).forEach(langCode => {
            const option = document.createElement('option');
            option.value = langCode;
            option.textContent = `${SUPPORTED_LANGUAGES[langCode].nativeName} (${SUPPORTED_LANGUAGES[langCode].name})`;
            option.selected = langCode === this.currentLanguage;
            selector.appendChild(option);
        });

        selector.addEventListener('change', (e) => {
            this.setLanguage(e.target.value);
        });

        return selector;
    }

    createVoiceToggle() {
        const toggle = document.createElement('button');
        toggle.className = 'voice-toggle';
        toggle.style.cssText = `
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 5px;
            background: ${this.isVoiceEnabled ? '#28a745' : '#6c757d'};
            color: white;
            cursor: pointer;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;

        const updateToggle = () => {
            toggle.innerHTML = `
                <i class="fas fa-${this.isVoiceEnabled ? 'volume-up' : 'volume-mute'}"></i>
                ${this.getText(this.isVoiceEnabled ? 'disableVoice' : 'enableVoice')}
            `;
            toggle.style.background = this.isVoiceEnabled ? '#28a745' : '#6c757d';
        };

        updateToggle();

        toggle.addEventListener('click', () => {
            if (this.isVoiceEnabled) {
                this.disableVoice();
            } else {
                this.enableVoice();
            }
            updateToggle();
        });

        // Listen for voice state changes
        document.addEventListener('voiceStateChanged', updateToggle);
        document.addEventListener('languageChanged', updateToggle);

        return toggle;
    }

    // Helper method to make any element voice-enabled
    makeElementVoiceEnabled(element, textKey) {
        if (!element) return;

        // Add speak button
        const speakBtn = document.createElement('button');
        speakBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        speakBtn.className = 'speak-btn';
        speakBtn.style.cssText = `
            background: none;
            border: none;
            color: #007bff;
            cursor: pointer;
            padding: 0.25rem;
            margin-left: 0.5rem;
            border-radius: 3px;
        `;
        speakBtn.title = this.getText('speakText');

        speakBtn.addEventListener('click', () => {
            const text = textKey ? this.getText(textKey) : element.textContent;
            this.speak(text);
        });

        element.appendChild(speakBtn);

        return speakBtn;
    }

    // Voice form filling helper
    voiceFillForm(formElement, fieldMap = {}) {
        if (!this.isVoiceEnabled || !formElement) return;

        const fields = formElement.querySelectorAll('input, select, textarea');
        let currentFieldIndex = 0;

        const fillNextField = () => {
            if (currentFieldIndex >= fields.length) {
                this.speak(this.getText('voiceFormComplete') || 'Form completed successfully');
                return;
            }

            const field = fields[currentFieldIndex];
            const fieldName = fieldMap[field.id] || field.placeholder || field.name || 'field';

            this.speak(`Please provide ${fieldName}`).then(() => {
                this.startListening((result, error) => {
                    if (error) {
                        this.speak('Sorry, I did not understand. Please try again.');
                        fillNextField();
                        return;
                    }

                    if (result) {
                        // Process the voice input based on field type
                        if (field.type === 'email') {
                            // Simple email processing
                            const emailMatch = result.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
                            field.value = emailMatch ? emailMatch[0] : result;
                        } else {
                            field.value = result;
                        }

                        // Trigger change event
                        field.dispatchEvent(new Event('change', { bubbles: true }));

                        currentFieldIndex++;
                        setTimeout(fillNextField, 1000);
                    }
                });
            });
        };

        this.speak('I will help you fill this form using voice. Please speak clearly after each prompt.').then(() => {
            setTimeout(fillNextField, 1000);
        });
    }
}

// Initialize global language manager
window.languageManager = new LanguageManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LanguageManager, SUPPORTED_LANGUAGES, TRANSLATIONS };
}