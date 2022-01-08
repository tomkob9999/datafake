// App Name: datafake.js
// Author: Tomio Kobayashi 
// Version: 0.902

// Default Values
const defaults = {
    num_recs: 100,
    max_num_recs: 10000,
    word_min: 2,
    word_max: 10,
    max_word_max: 100,
    para_max: 2,
    max_para_max: 10,
    alpha_min: 2,
    alpha_max: 6,
    max_alpha_max: 50,
    int_min: 0,
    int_max: 10000,
    max_int_max: 100000000,
    year_min: 1920,
    year_max: 2050,
    max_year_max: 2100,
    blank_freq: 15,
    // Active Locales.  Leave empty to activate all available locales below
    active_locales: [
        {name: 'en_US'},
        {name: 'ja'}
    ],
    exclude_types: [
        {value: 'password'}
    ]
}

// Available locales
// 0: {name: 'az', title: 'Azerbaijani'}
// 1: {name: 'ar', title: 'Arabic'}
// 2: {name: 'cz', title: 'Czech'}
// 3: {name: 'de', title: 'German'}
// 4: {name: 'de_AT', title: 'German (Austria)'}
// 5: {name: 'de_CH', title: 'German (Switzerland)'}
// 6: {name: 'en', title: 'English'}
// 7: {name: 'en_AU', title: 'English (Australia)'}
// 8: {name: 'en_AU_ocker', title: 'English (Australia Ocker)'}
// 9: {name: 'en_BORK', title: 'English (Bork)'}
// 10: {name: 'en_CA', title: 'English (Canada)'}
// 11: {name: 'en_GB', title: 'English (Great Britain)'}
// 12: {name: 'en_IE', title: 'English (Ireland)'}
// 13: {name: 'en_IND', title: 'English (India)'}
// 14: {name: 'en_US', title: 'English (United States)'}
// 15: {name: 'en_ZA', title: 'English (South Africa)'}
// 16: {name: 'es', title: 'Spanish'}
// 17: {name: 'es_MX', title: 'Spanish (Mexico)'}
// 18: {name: 'fa', title: 'Farsi'}
// 19: {name: 'fi', title: 'Finnish'}
// 20: {name: 'fr', title: 'French'}
// 21: {name: 'fr_CA', title: 'French (Canada)'}
// 22: {name: 'fr_CH', title: 'French (Switzerland)'}
// 23: {name: 'ge', title: 'Georgian'}
// 24: {name: 'hy', title: 'Armenian'}
// 25: {name: 'hr', title: 'Hrvatski'}
// 26: {name: 'id_ID', title: 'Indonesia'}
// 27: {name: 'it', title: 'Italian'}
// 28: {name: 'ja', title: 'Japanese'}
// 29: {name: 'ko', title: 'Korean'}
// 30: {name: 'nb_NO', title: 'Norwegian'}
// 31: {name: 'ne', title: 'Nepalese'}
// 32: {name: 'nl', title: 'Dutch'}
// 33: {name: 'nl_BE', title: 'Dutch (Belgium)'}
// 34: {name: 'pl', title: 'Polish'}
// 35: {name: 'pt_BR', title: 'Portuguese (Brazil)'}
// 36: {name: 'pt_PT', title: 'Portuguese (Portugal)'}
// 37: {name: 'ro', title: 'Romanian'}
// 38: {name: 'ru', title: 'Russian'}
// 39: {name: 'sk', title: 'Slovakian'}
// 40: {name: 'sv', title: 'Swedish'}
// 41: {name: 'tr', title: 'Turkish'}
// 42: {name: 'uk', title: 'Ukrainian'}
// 43: {name: 'vi', title: 'Vietnamese'}
// 44: {name: 'zh_CN', title: 'Chinese'}
// 45: {name: 'zh_TW', title: 'Chinese (Taiwan)'}

const POS_NAME = 0;
const POS_TYPE = 1;
// const POS_LEN = 2;
const POS_MIN = 2;
const POS_MAX = 3;
const POS_BLANK = 4;
const POS_DEL = 5;

const genTypes = [
    // {value: "", title: "Select Type"},
    {value: "word", title: "Text (word)", enable_min: false, enable_max: false, enable_blank: true, func: (props)=>{
            const blank_freq = props.blank_freq;
            if (blank_freq > 0) {
                let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
                // console.log("blank_freq", n1);
                if (n1 == 0) return "";
            }

            var max = props.max
            // var min = props.min
            // var S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            // // console.log("max", max);
            // var N = crypto.getRandomValues(new Uint16Array(1))[0]%(max-min+1)+min;
            // var ss = Array.from(crypto.getRandomValues(new Uint16Array(N))).map((n)=>S[n%S.length]).join('');
            // return ss;
            
            if (faker.locale == "ja") {
                return pickKanjiWord();
            }
            else {
                return faker.lorem.word(max);
            } 
        }
    },
    {value: "para", title: "Text (paragraph)", enable_min: false, enable_max: true, enable_blank: true, func: (props)=>{
            const blank_freq = props.blank_freq;
            if (blank_freq > 0) {
                let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
                if (n1 == 0) return "";
            }

            var max = props.max
            // let min = 10;
            // var S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ          .,.,.,'''";
            // // console.log("max", max);
            // var N = crypto.getRandomValues(new Uint16Array(1))[0]%(max-min+1)+min;
            // var ss = Array.from(crypto.getRandomValues(new Uint16Array(N))).map((n)=>S[n%S.length]).join('').trim();
            // ss = ss.replace("  ", " ")
        
            // if (ss.length < 10) return "";
            // return ss.trim();
            
            if (faker.locale == "ja") {
                return generateJParagraph(max);
            }
            else {
                return faker.lorem.paragraph(max);
            }
        }
    },
    {value: "alphaup", title: "Alphabets (Upper)", enable_min: true, enable_max: true, enable_blank: true, func: (props)=>{
            const blank_freq = props.blank_freq;
            if (blank_freq > 0) {
                let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
                // console.log("blank_freq", n1);
                if (n1 == 0) return "";
            }

            var max = props.max
            var min = props.min
            // var S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var S="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            // console.log("max", max);
            var N = crypto.getRandomValues(new Uint16Array(1))[0]%(max-min+1)+min;
            var ss = Array.from(crypto.getRandomValues(new Uint16Array(N))).map((n)=>S[n%S.length]).join('');
            // var ss = Array.from(crypto.getRandomValues(new Uint16Array(max))).map((n)=>S[n%S.length]).join('');
            return ss;
        }
    },
    {value: "alphalo", title: "Alphabets (Lower)", enable_min: true, enable_max: true, enable_blank: true, func: (props)=>{
            const blank_freq = props.blank_freq;
            if (blank_freq > 0) {
                let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
                // console.log("blank_freq", n1);
                if (n1 == 0) return "";
            }

            var max = props.max
            var min = props.min
            // var S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var S="abcdefghijklmnopqrstuvwxyz";
            // console.log("max", max);
            var N = crypto.getRandomValues(new Uint16Array(1))[0]%(max-min+1)+min;
            var ss = Array.from(crypto.getRandomValues(new Uint16Array(N))).map((n)=>S[n%S.length]).join('');
            // var ss = Array.from(crypto.getRandomValues(new Uint16Array(max))).map((n)=>S[n%S.length]).join('');
            return ss;
        }
    },
    {value: "joyokanji", title: "Japanese Text (Kanji)", enable_min: true, enable_max: true, enable_blank: true, func: (props)=>{
            const blank_freq = props.blank_freq;
            if (blank_freq > 0) {
                let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
                // console.log("blank_freq", n1);
                if (n1 == 0) return "";
            }

            var max = props.max
            var min = props.min
            var N = crypto.getRandomValues(new Uint16Array(1))[0]%(max-min+1)+min;
            var ss = Array.from(crypto.getRandomValues(new Uint16Array(N))).map((n)=>all_joyokanjis[n%all_joyokanjis.length]).join('');
            return ss;
        }
    },
    {value: "hira", title: "Japanese Text (Hiragana)", enable_min: true, enable_max: true, enable_blank: true, func: (props)=>{
            const blank_freq = props.blank_freq;
            if (blank_freq > 0) {
                let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
                // console.log("blank_freq", n1);
                if (n1 == 0) return "";
            }

            var max = props.max
            var min = props.min
            var N = crypto.getRandomValues(new Uint16Array(1))[0]%(max-min+1)+min;
            var ss = Array.from(crypto.getRandomValues(new Uint16Array(N))).map((n)=>hiraganas[n%hiraganas.length]).join('');
            return ss;
        }
    },
    {value: "kata", title: "Japanese Text (Katakana)", enable_min: true, enable_max: true, enable_blank: true, func: (props)=>{
            const blank_freq = props.blank_freq;
            if (blank_freq > 0) {
                let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
                // console.log("blank_freq", n1);
                if (n1 == 0) return "";
            }

            var max = props.max
            var min = props.min
            var N = crypto.getRandomValues(new Uint16Array(1))[0]%(max-min+1)+min;
            var ss = Array.from(crypto.getRandomValues(new Uint16Array(N))).map((n)=>katakanas[n%katakanas.length]).join('');
            return ss;
        }
    },
    {value: "mixjap", title: "Japanese Text (Mixed)", enable_min: true, enable_max: true, enable_blank: true, func: (props)=>{
            const blank_freq = props.blank_freq;
            if (blank_freq > 0) {
                let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
                // console.log("blank_freq", n1);
                if (n1 == 0) return "";
            }

            var max = props.max
            var min = props.min
            var N = crypto.getRandomValues(new Uint16Array(1))[0]%(max-min+1)+min;
            var ss = Array.from(crypto.getRandomValues(new Uint16Array(N))).map((n)=>{
                
                var nn = crypto.getRandomValues(new Uint16Array(1))[0]%(3);
                if (nn == 0) {
                    return all_joyokanjis[n%all_joyokanjis.length];
                }
                else if (nn == 1) {
                    return hiraganas[n%hiraganas.length];
                }
                else {
                    return katakanas[n%katakanas.length];
                }
            }
            ).join('');
            return ss;
        }
    },
    {value: "integer", title: "Integer", enable_min: true, enable_max: true, enable_blank: true, func: (props)=>{
        const blank_freq = props.blank_freq;
        // console.log("blank_freq", blank_freq);
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            // console.log("blank_freq", n1);
            if (n1 == 0) return "";
        }

        var max = props.max
        var min = props.min
        // console.log("min", min);
        // console.log("max", max);
        var N = crypto.getRandomValues(new Uint32Array(1))[0]%(max-min+1)+min;
        return N;
        }
    },
    {value: "intzero", title: "Integer - zero-suppress", enable_min: true, enable_max: true, enable_blank: true, func: (props)=>{
            const blank_freq = props.blank_freq;
            // console.log("blank_freq", blank_freq);
            if (blank_freq > 0) {
                let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
                // console.log("blank_freq", n1);
                if (n1 == 0) return "";
            }

            var max = props.max
            var min = props.min
            // console.log("min", min);
            // console.log("max", max);
            var N = crypto.getRandomValues(new Uint32Array(1))[0]%(max-min+1)+min;
            const ns = "" + N;
            const maxs = "" + max;
            // console.log("N", N);
            // console.log("ns", ns);

            return "0".repeat(maxs.length - ns.length) + ns;
        }
    },
    {value: "yyyymmdd", title: "Date (yyyymmdd)", enable_min: true, enable_max: true, enable_blank: true, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        var max = props.max
        var min = props.min
        // console.log("min", min);
        // console.log("max", max);
        var N = crypto.getRandomValues(new Uint16Array(1))[0]%(max-min+1)+min;
        var dob = faker.date.past(50, new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)"));
        var m = (dob.getMonth()+1);
        var d = dob.getDate();
        dob = "" + N + "" + (m<10?"0":"") + m + "" + (d<10?"0":"") + d;
        return dob
    }},
    {value: "yyyy/mm/dd", title: "Date (yyyy/mm/dd)", enable_min: true, enable_max: true, enable_blank: true, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        var max = props.max
        var min = props.min
        // console.log("min", min);
        // console.log("max", max);
        var N = crypto.getRandomValues(new Uint16Array(1))[0]%(max-min+1)+min;
        var dob = faker.date.past(50, new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)"));
        var m = (dob.getMonth()+1);
        var d = dob.getDate();
        dob = "" + N + "/" + (m<10?"0":"") + m + "/" + (d<10?"0":"") + d;
        return dob
    }},
    {value: "yyyy-mm-dd", title: "Date (yyyy-mm-dd)", enable_min: true, enable_max: true, enable_blank: true, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        var max = props.max
        var min = props.min
        // console.log("min", min);
        // console.log("max", max);
        var N = crypto.getRandomValues(new Uint16Array(1))[0]%(max-min+1)+min;
        var dob = faker.date.past(50, new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)"));
        var m = (dob.getMonth()+1);
        var d = dob.getDate();
        dob = "" + N + "-" + (m<10?"0":"") + m + "-" + (d<10?"0":"") + d;
        return dob
    }},
    {value: "fname", title: "First Name", enable_min: false, enable_max: false, enable_blank: true, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        // return faker.name.firstName()
        if (faker.locale == "ja") {
            return generateJFirstName();
        } else {
            return faker.name.firstName();
        }
    }},
    {value: "fname_hira", title: "First Name - Hira", enable_min: false, enable_max: false, enable_blank: true, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        // console.log("props", props);
        if (!("fname" in props) || props.fname == "") {
            // return "わかわか"
            return "";
        }
        return convKanjiToKunyomi(props.fname);
    }},
    {value: "fname_kata", title: "First Name - Kata", enable_min: false, enable_max: false, enable_blank: true, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        // console.log("props", props);
        if (!("fname" in props) || props.fname == "") {
            // return "ワカワカ"
            return "";
        }
        return convHira2Kata(convKanjiToKunyomi(props.fname));
    }},
    {value: "lname", title: "Last Name", enable_min: false, enable_max: false, enable_blank: true, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        if (faker.locale == "ja") {
            return generateJLastName();
        } else {
            return faker.name.lastName();
        }
    }},
    {value: "lname_hira", title: "Last Name - Hira", enable_min: false, enable_max: false, enable_blank: true, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        // console.log("props", props);
        if (!("lname" in props) || props.lname == "") {
            // return "わかわか"
            return "";
        }
        return convKanjiToKunyomi(props.lname);
    }},
    {value: "lname_kata", title: "Last Name - Kata", enable_min: false, enable_max: false, enable_blank: true, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        // console.log("props", props);
        if (!("lname" in props) || props.lname == "") {
            // return "ワカワカ"
            return "";
        }
        return convHira2Kata(convKanjiToKunyomi(props.lname));
    }},
    {value: "fullname", title: "Full Name", enable_min: false, enable_max: false, enable_blank: true, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        
        if (faker.locale == "ja") {
            // return generateJLastName();
            // return (generateJLastName() + " " +  faker.name.firstName())
            return (generateJLastName() + " " +  generateJFirstName())
        } else {
            // return faker.name.lastName();
            return (faker.name.firstName() + " " +  faker.name.lastName())
            // return (faker.name.lastName() + " " +  faker.name.firstName())
        }
    }},
    {value: "fullname_hira", title: "Full Name - Hira", enable_min: false, enable_max: false, enable_blank: true, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        // console.log("props", props);
        // console.log("convKanjiToKunyomi", convKanjiToKunyomi("熊"));
        if (!("fullname" in props) || props.fullname == "") {
            // return "わかわか わかわか";
            return "";
        }
        return convKanjiToKunyomi(props.fullname);
    }},
    {value: "fullname_kata", title: "Full Name - Kata", enable_min: false, enable_max: false, enable_blank: true, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        // console.log("props", props);
        if (!("fullname" in props) || props.fullname == "") {
            // return "ワカワカ ワカワカ"
            return "";
        }
        return convHira2Kata(convKanjiToKunyomi(props.fullname));
    }},
    {value: "dob", title: "Date of Birth", enable_min: false, enable_max: false, enable_blank: true, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        var dob = faker.date.past(50, new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)"));
        dob = dob.getFullYear() + "-" + (dob.getMonth()+1) + "-" + dob.getDate();
        return dob
    }},
    {value: "gender", title: "Gender", enable_min: false, enable_max: false, enable_blank: true, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        return faker.name.gender()
    }},
    {value: "faddress", title: "Full Address", enable_min: false, enable_max: false, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        if (faker.locale == "ja") {
            // const state = generatePrefecture();
            // const city = generateCity(state);
            // return faker.address.zipCode() + " "  + state + "" + city + ""  + faker.address.streetAddress();
            return generateFullAddress();
        } else {
            // return faker.address.zipCode() + " "  + faker.address.state() + " "  + faker.address.city() + " "  + faker.address.streetAddress();
            return faker.address.streetAddress() + " "  + faker.address.city() + " "  + faker.address.state() + " "  + faker.address.zipCode()
        }
    }},
    {value: "faddresswoz", title: "Full Address w/o Zip", enable_min: false, enable_max: false, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        if (faker.locale == "ja") {
            // const state = generatePrefecture();
            // const city = generateCity(state);
            // return state + "" + city + ""  + faker.address.streetAddress();
            return generateFullAddressNoZip();
        } else {
            // return faker.address.zipCode() + " "  + faker.address.state() + " "  + faker.address.city() + " "  + faker.address.streetAddress();
            return faker.address.streetAddress() + " "  + faker.address.city() + " "  + faker.address.state();
        }
    }},
    {value: "zip", title: "Zip", enable_min: false, enable_max: false, enable_blank: true, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        return faker.address.zipCode()
    }},
    {value: "street", title: "Street Address", enable_min: false, enable_max: false, enable_blank: true, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        if (faker.locale == "ja") {
            // console.log("props.state", props.state);
            // console.log("props.city", props.city);
            if (props.state && props.city) {
                return generateStreet(props.state + props.city);
            } else {
                return faker.address.streetAddress()
            }
        } else {
            return faker.address.streetAddress()
        }
    }},
    {value: "city", title: "City", enable_min: false, enable_max: false, enable_blank: true, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        // return faker.address.city()
            // console.log("props.state", props.state);
        if (faker.locale == "ja") {
            return generateCity(props.state);
        } else {
            return faker.address.city();
        }
    }},
    {value: "state", title: "State", enable_min: false, enable_max: false, enable_blank: true, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        return faker.address.state();
    }},
    {value: "password", title: "Password", enable_min: false, enable_max: false, enable_blank: true, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        return faker.internet.password()
    }},
    {value: "phone", title: "Phone Number", enable_min: false, enable_max: false, enable_blank: true, func: (props)=> {
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
            return faker.phone.phoneNumber()
        }
    },
    {value: "email", title: "Email", enable_min: false, enable_max: false, enable_blank: true, func: (props)=>{
        const blank_freq = props.blank_freq;
        if (blank_freq > 0) {
            let n1 = crypto.getRandomValues(new Uint16Array(1))[0]%(blank_freq);
            if (n1 == 0) return "";
        }
        var firstName = faker.name.firstName(),
        lastName = faker.name.lastName();
        return faker.internet.email(firstName, lastName);
    }},
]

var _locales = [];
// var currentLocale = "";
// console.log("HelloHello");
// console.log(_locales);

window.onload = () => {

    for(var locale in faker.locales) {
        _locales.push({ name: locale, title: faker.locales[locale].title})
    }

    // console.log(_locales);
  
    const thelocale = defaults.active_locales.length>0 ? defaults.active_locales: _locales;
        thelocale.map((v) => {
            let vv = v;
            if (defaults.active_locales.length>0) {
                vv = _locales.filter(d=>d.name == v.name)[0];
            }
            const sel1 = document.querySelector(".select1");
            var option = document.createElement("option");
            option.text = vv.title;
            option.value = vv.name;
            sel1.appendChild(option);
        });
    
        // currentLocale = document.querySelector(".select1").value;
    // }
    const btnadd = document.querySelector("#btnadd");
    btnadd.addEventListener("click", () => {
        // console.log("button clicked");
        const table = document.querySelector(".table");
        let newRow = table.insertRow();

        let newCell = newRow.insertCell();
        const input1 = document.createElement("input");
        input1.setAttribute("type", "text");
        input1.setAttribute("class", "form-control");
        input1.setAttribute("placeholder", "Name");
        input1.setAttribute("aria-label", "FieldName");
        input1.setAttribute("aria-describedby", "basic-addon1");
        newCell.appendChild(input1);

        newCell = newRow.insertCell();
        let select1 = document.createElement("select");
        select1.classList.add("form-select");
        select1.classList.add("select1");
        newCell.appendChild(select1);
        genTypes.map((v) => {
            if (!defaults.exclude_types.find(d=>d.value==v.value)) {
                let option1 = document.createElement("option");
                option1.text = v.title;
                option1.value = v.value;
                select1.appendChild(option1);
            }
        });
        select1.addEventListener("change", (e) => {
            // console.log("type changed");
            const genType = genTypes.filter(d=>d.value==e.target.value)[0];
            // console.log(genType.enable_max);
            // console.log(e.target.parentElement.parentElement.children[4].children[0]);
            if (genType.enable_min) {
                e.target.parentElement.parentElement.children[POS_MIN].children[0].removeAttribute("disabled");
            } else {
                e.target.parentElement.parentElement.children[POS_MIN].children[0].setAttribute("disabled", true);
            }
            if (genType.enable_max) {
                e.target.parentElement.parentElement.children[POS_MAX].children[0].removeAttribute("disabled");
            } else {
                e.target.parentElement.parentElement.children[POS_MAX].children[0].setAttribute("disabled", true);
            }
        });

        
        newCell = newRow.insertCell();
        const input4 = document.createElement("input");
        input4.setAttribute("type", "text");
        input4.setAttribute("class", "form-control");
        input4.setAttribute("placeholder", "Min");
        input4.setAttribute("aria-label", "Min");
        input4.setAttribute("aria-describedby", "basic-addon1");
        input4.setAttribute("disabled", true);
        newCell.appendChild(input4);

        newCell = newRow.insertCell();
        const input3 = document.createElement("input");
        input3.setAttribute("type", "text");
        input3.setAttribute("class", "form-control");
        input3.setAttribute("placeholder", "Max");
        input3.setAttribute("aria-label", "Max");
        input3.setAttribute("aria-describedby", "basic-addon1");
        input3.setAttribute("disabled", true);
        newCell.appendChild(input3);

        newCell = newRow.insertCell();
        const input5 = document.createElement("input");
        input5.setAttribute("type", "checkbox");
        input5.setAttribute("class", "form-check-input");
        input5.style.marginTop = "10px";
        input5.style.marginBottom = "10px";
        input5.style.marginLeft = "16px";
        newCell.appendChild(input5);

        newCell = newRow.insertCell();
        const button1 = document.createElement("button");
        button1.classList.add("btn");
        button1.classList.add("btn-outline-danger");
        button1.style.width = "80px";
        button1.style.height = "35px";
        button1.textContent = "Delete";
        button1.addEventListener("click", (e) => {
            // console.log("delete clicked");
            // console.log(e.target);
            e.target.parentElement.parentElement.remove();
        });
        newCell.appendChild(button1);

    })


    
    const btngen = document.querySelector("#btngen");
    btngen.addEventListener("click", () => {
        
        document.querySelector(".spinback").style.display = "flex";

        setTimeout(() => {
            generateOutput();
            document.querySelector(".spinback").style.display = "none";
        }, 10);
        
    })

    const btncopy = document.querySelector("#btncopy");
    btncopy.addEventListener("click", () => {
        const ta1 = document.querySelector("#ta1");
        navigator.clipboard.writeText(ta1.value).then(e => {
        //   console.log('Copied');
          
          document.querySelector('.toast-body').textContent = "copied to clipboard"
          document.querySelectorAll('.toast')
          .forEach(function (toastNode) {
            var toast = new bootstrap.Toast(toastNode, {
              autohide: true
            })
            toast.show()
          })
        });
    });

    document.querySelector(".spinback").style.display ="none";
}


const generateOutput = () => {
            // document.querySelector(".spinback").style.display ="flex";


            const fields = [];
            const table = document.querySelector(".table");
            // for (let row of table.rows) {
            //     fields.push({type: "xxx"})
            //     for(let cell of row.cells){
            //        console.log(cell.inner);
            //     }
            // }
    
            for (var i=0, rowLen=table.rows.length; i<rowLen; i++) {
                let obj = {}
                if (i == 0) continue;
                for (var j=0, colLen=table.rows[i].cells.length ; j<colLen; j++) {
                    var cell = table.rows[i].cells[j];
                    if (j == POS_NAME) {
                        // console.log(cell.innerHTML);
                        let text10 = cell.getElementsByTagName('input')[0];
                        // console.log(text10.value);
                        obj = {...obj, name: text10.value};
                    }
                    else if (j == POS_TYPE) {
                        // console.log(cell.innerHTML);
                        var sel3 = cell.getElementsByTagName('select')[0];
                        // console.log(sel3.value);
    
                        const func = genTypes.filter((d) => d.value == sel3.value)[0].func;
                        obj = {...obj, type: sel3.value, func: func};
                    }
                    // else if (j == POS_LEN) {
                    //     // console.log(cell.innerHTML);
                    //     let text11 = cell.getElementsByTagName('input')[0];
                    //     // console.log(text11.value);
                    //     obj = {...obj, length: text11.value};
                    // }
                    else if (j == POS_MIN) {
                        // console.log(cell.innerHTML);
                        let text12 = cell.getElementsByTagName('input')[0];
                        // console.log(text11.value);
                        obj = {...obj, min: text12.value};
                    }
                    else if (j == POS_BLANK) {
                        // console.log(cell.innerHTML);
                        let text12 = cell.getElementsByTagName('input')[0];
                        // console.log(text11.value);
                        obj = {...obj, allow_blank: text12.checked};
                    }
                    else if (j == POS_MAX) {
                        // console.log(cell.innerHTML);
                        let text13 = cell.getElementsByTagName('input')[0];
                        // console.log(text11.value);
                        obj = {...obj, max: text13.value};
                    }
                }
                fields.push(obj);
            }
            // console.log(fields);
            const sel11 = document.querySelector(".select1");
            // console.log("sel11.value");
            // console.log(sel11.value);
            faker.locale = (sel11.value == "") ? "ja" : sel11.value;
            // currentLocale = sel11.value;
            // console.log("faker.locale");
            // console.log(faker.locale);
            let outtext = [];
            let num_recs = defaults.num_recs;
            const sss = document.querySelector("#num_recs").value;
            if (sss != "" && !isNaN(sss)) {
                num_recs = parseInt(sss);
            }
            if (num_recs > defaults.max_num_recs) num_recs = defaults.max_num_recs; 
            // console.log("num_recs", num_recs);
    
            const outputformat = document.querySelector(".select2").value;
            
            // console.log("outputformat", outputformat);
            let delim = ",";
            
            if (outputformat == "json") {
                const outjson = [];
                let props = {};
                for (let x=0; x<num_recs; x++) {
                    let fname = "";
                    let lname = "";
                    let fullname = "";
                    let state = "";
                    let city = "";
    
                    let jsonrec = {}
                    let ss = "";
                    fields.map((d, index) => {
                        let res = null;
                        // console.log(d.type);
                        props["blank_freq"] = (d.allow_blank) ? defaults.blank_freq : 0;
                        if (d.type == "word") {
                            let min = defaults.word_min;
                            if (d.min != "" && !isNaN(d.min)) min = parseInt(d.min);
                            let max = defaults.word_max;
                            if (d.max != "" && !isNaN(d.max)) max = parseInt(d.max);
                            if (max > defaults.max_word_max) max = defaults.max_word_max;
                            props["min"] = min;
                            props["max"] = max;
                            // props = {min, max};
                            res = d.func(props);
                        }
                        else if (d.type == "para") {
                            let max = defaults.para_max;
                            if (d.max != "" && !isNaN(d.max)) max = parseInt(d.max);
                            if (max > defaults.max_para_max) max = defaults.max_para_max;
                            props["max"] = max;
                            // props = {max};
                            res = d.func(props);
                        }
                        // else if (d.type == "integer") {
                        else if (["alphaup", "alphalo", "joyokanji", "hira", "kata", "mixjap"].includes(d.type)) {
                            let min = defaults.alpha_min;
                            if (d.min != "" && !isNaN(d.min)) min = parseInt(d.min);
                            let max = defaults.alpha_max;
                            if (d.max != "" && !isNaN(d.max)) max = parseInt(d.max);
                            if (max > defaults.max_alpha_max) max = defaults.max_alpha_max;
                            props["min"] = min;
                            props["max"] = max;
                            // props = {min, max};
                            res = d.func(props);
                        }
                        // else if (d.type == "integer") {
                        else if (["integer", "intzero"].includes(d.type)) {
                            let min = defaults.int_min;
                            if (d.min != "" && !isNaN(d.min)) min = parseInt(d.min);
                            let max = defaults.int_max;
                            if (d.max != "" && !isNaN(d.max)) max = parseInt(d.max);
                            if (max > defaults.max_int_max) max = defaults.max_int_max;
                            props["min"] = min;
                            props["max"] = max;
                            // props = {min, max};
                            res = d.func(props);
                            if ("" == res) res = null;
                        }
                        else if (["yyyymmdd", "yyyy/mm/dd", "yyyy-mm-dd"].includes(d.type)) {
                            // console.log("yyyy");
                            let min = defaults.year_min;
                            if (d.min != "" && !isNaN(d.min)) min = parseInt(d.min);
                            let max = defaults.year_max;
                            if (d.max != "" && !isNaN(d.max)) max = parseInt(d.max);
                            if (max > defaults.max_year_max) max = defaults.max_year_max;
                            props["min"] = min;
                            props["max"] = max;
                            // props = {min, max};
                            res = d.func(props);
                        }
                        else if (d.type == "fname") {
                            res = d.func(props);
                            fname = res;
                        }
                        else if (["fname_hira", "fname_kata"].includes(d.type)) {
                            // console.log("fname", fname);
                            props["fname"] = fname;
                            res = d.func(props);
                        }
                        else if (d.type == "lname") {
                            res = d.func(props);
                            lname = res;
                        }
                        // else if (d.type == "lname_hira") {
                        else if (["lname_hira", "lname_kata"].includes(d.type)) {
                            props["lname"] = lname;
                            res = d.func(props);
                        }
                        else if (d.type == "fullname") {
                            res = d.func(props);
                            fullname = res;
                        }
                        else if (d.type == "state") {
                            // console.log("state out", state);
                            res = d.func(props);
                            state = res;
                        }
                        else if (d.type == "city") {
                            props["state"] = state;
                            res = d.func(props);
                            city = res;
                        }
                        else if (d.type == "street") {
                            props["state"] = state;
                            props["city"] = city;
                            res = d.func(props);
                            street = res;
                        }
                        // else if (d.type == "fullname_hira") {
                        else if (["fullname_hira", "fullname_kata"].includes(d.type)) {
                            props["fullname"] = fullname;
                            res = d.func(props);
                        }
                        // // else if (["city"].includes(d.type)) 
                        // else if (["city"].includes(d.type)) {
                        //     props["state"] = state;
                        //     console.log("state in", state);
                        //     res = d.func(props);
                        // }
                        // else if (["street"].includes(d.type)) {
                        //     props["state"] = state;
                        //     props["city"] = city;
                        //     res = d.func(props);
                        // }
                        else {
                            res = d.func(props);
                        }
                        // else {
                        jsonrec[fields[index].name] = res;
                        // }
                    })
                    outjson.push(jsonrec);
                }
                const ta1 = document.querySelector("#ta1");
                ta1.textContent = JSON.stringify(outjson, null, "\t");
            } else {
                
                let props = {};
                if (outputformat == "tsv") 
                delim = "\t";
                let ss = "";
                fields.map((d, index) => {
                    if (index > 0) ss += delim;
                    // console.log(d.type);
                    // console.log(d.func());
                    ss += d.name;
                })
                outtext.push(ss);
                for (let x=0; x<num_recs; x++) {
                    ss = "";
                    let fname = "";
                    let lname = "";
                    let fullname = "";
                    let state = "";
                    let city = "";
                    fields.map((d, index) => {
                        if (index > 0) ss += delim;
                        // console.log(d.type);
                        // console.log(d.func());
                        props["blank_freq"] = (d.allow_blank) ? defaults.blank_freq : 0;
                        if (d.type == "word") {
                            let min = defaults.word_min;
                            if (d.min != "" && !isNaN(d.min)) min = parseInt(d.min);
                            let max = defaults.word_max;
                            if (d.max != "" && !isNaN(d.max)) max = parseInt(d.max);
                            if (max > defaults.max_word_max) max = defaults.max_word_max;
                            // props = {min, max};
                            props["min"] = min;
                            props["max"] = max;
                            // ss += d.func(min, max);
                        }
                        else if (d.type == "para") {
                            let max = defaults.para_max;
                            if (d.max != "" && !isNaN(d.max)) max = parseInt(d.max);
                            if (max > defaults.max_para_max) max = defaults.max_para_max;
                            // props = {max};
                            // props["min"] = min;
                            props["max"] = max;
                            // ss += d.func(max);
                        }
                        else if (["alphaup", "alphalo", "joyokanji", "hira", "kata", "mixjap"].includes(d.type)) {
                            let min = defaults.alpha_min;
                            if (d.min != "" && !isNaN(d.min)) min = parseInt(d.min);
                            let max = defaults.alpha_max;
                            if (d.max != "" && !isNaN(d.max)) max = parseInt(d.max);
                            if (max > defaults.max_alpha_max) max = defaults.max_alpha_max;
                            // props = {min, max};
                            props["min"] = min;
                            props["max"] = max;
                            // ss += d.func(min, max);
                        }
                        else if (["integer", "intzero"].includes(d.type)) {
                            let min = defaults.int_min;
                            if (d.min != "" && !isNaN(d.min)) min = parseInt(d.min);
                            let max = defaults.int_max;
                            if (d.max != "" && !isNaN(d.max)) max = parseInt(d.max);
                            if (max > defaults.max_int_max) max = defaults.max_int_max;
                            // props = {min, max};
                            props["min"] = min;
                            props["max"] = max;
                            // ss += d.func(min, max);
                        }
                        else if (["yyyymmdd", "yyyy/mm/dd", "yyyy-mm-dd"].includes(d.type)) {
                            // console.log("yyyymmdd IN");
                            let min = defaults.year_min;
                            if (d.min != "" && !isNaN(d.min)) min = parseInt(d.min);
                            let max = defaults.year_max;
                            if (d.max != "" && !isNaN(d.max)) max = parseInt(d.max);
                            if (max > defaults.max_year_max) max = defaults.max_year_max;
                            
                            props["min"] = min;
                            props["max"] = max;
                            // props = {min, max};
                            // ss += d.func(min, max);
                        }
                        else if (["fname_hira", "fname_kata"].includes(d.type)) {
                            // console.log("fname", fname);
                            props["fname"] = fname;
                        }
                        else if (["lname_hira", "lname_kata"].includes(d.type)) {
                        // else if (d.type == "lname_hira") {
                            // console.log("fname", fname);
                            props["lname"] = lname;
                        }
                        // else if (d.type == "fullname_hira") {
                        else if (["fullname_hira", "fullname_kata"].includes(d.type)) {
                            // console.log("fname", fname);
                            props["fullname"] = fullname;
                        }
                        // else if (["city"].includes(d.type)) {
                        else if (d.type == "city") {
                            // console.log("fname", fname);
                            props["state"] = state;
                        }
                        // else if (["street"].includes(d.type)) {
                        else if (d.type == "street") {
                            // console.log("fname", fname);
                            props["city"] = state;
                        }
                        // else {
                        // console.log("d.allow_blank", d.allow_blank);
                        // console.log("props.blank_freq", props["blank_freq"]);
                        
                        let sss = d.func(props);
    
                        if (d.type == "fname") {
                            fname = sss;
                        }
                        else if (d.type == "lname") {
                            lname = sss;
                        }
                        else if (d.type == "fullname") {
                            fullname = sss;
                        }
                        else if (d.type == "state") {
                            state = sss;
                        }
                        else if (d.type == "city") {
                            city = sss;
                        }
                        ss += sss;
                        // }
                    })
                    outtext.push(ss);
                }
                const str7 = outtext.join("\n");
                const ta1 = document.querySelector("#ta1");
                ta1.textContent = str7;
    
            } 
    
            document.querySelector('.toast-body').textContent = "output generated"
            document.querySelectorAll('.toast')
            .forEach(function (toastNode) {
              var toast = new bootstrap.Toast(toastNode, {
                autohide: true
              })
              toast.show()
            })
}
