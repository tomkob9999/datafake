// const locales = [
// ]

const genTypes = [
    {value: "", title: "Select Type"},
    {value: "fname", title: "First Name", func: ()=>faker.name.firstName()},
    {value: "lname", title: "Last Name", func: ()=>faker.name.lastName()},
    {value: "fullname", title: "Full Name", func: ()=>(faker.name.lastName() + " " +  faker.name.firstName())},
    {value: "dob", title: "Dat of Birth", func: ()=>{
        var dob = faker.date.past(50, new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)"));
        dob = dob.getFullYear() + "-" + (dob.getMonth()+1) + "-" + dob.getDate();
        return dob
    }},
    {value: "gender", title: "Gender", func: ()=>faker.name.gender()},
    {value: "faddress", title: "Full Address", func: ()=>faker.address.zipCode() + " "  + faker.address.state() + ""  + faker.address.city() + ""  + faker.address.streetAddress()},
    {value: "faddresswoz", title: "Full Address w/o Zip", func: ()=>faker.address.stateAbbr() + " "  + faker.address.city() + " "  + faker.address.streetAddress()},
    {value: "zip", title: "Zip", func: ()=>faker.address.zipCode()},
    {value: "street", title: "Street Address", func: ()=>faker.address.streetAddress()},
    {value: "city", title: "City", func: ()=>faker.address.city()},
    {value: "state", title: "State", func: ()=>faker.address.state()},
    {value: "country", title: "Country", func: ()=>faker.locales[faker.locale].address.default_country},
    {value: "password", title: "Password", func: ()=>faker.internet.password()},
    {value: "phone", title: "Phone Number", func: ()=>faker.phone.phoneNumber()},
    {value: "email", title: "Email", func: ()=>{
        var firstName = faker.name.firstName(),
        lastName = faker.name.lastName();
        return faker.internet.email(firstName, lastName);
    }},
]

var _locales = [];

// console.log("HelloHello");
// console.log(_locales);

window.onload = () => {
    
    for(var locale in faker.locales) {
        _locales.push({ name: locale, title: faker.locales[locale].title})
    }

    console.log(_locales);
  
    _locales.map((v) => {
        const sel1 = document.querySelector(".select1");
        var option = document.createElement("option");
        option.text = v.title;
        option.value = v.name;
        sel1.appendChild(option);
    });

    const btnadd = document.querySelector("#btnadd");
    btnadd.addEventListener("click", () => {
        console.log("button clicked");
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
            let option1 = document.createElement("option");
            option1.text = v.title;
            option1.value = v.value;
            select1.appendChild(option1);
        });


        newCell = newRow.insertCell();
        const input2 = document.createElement("input");
        input2.setAttribute("type", "text");
        input2.setAttribute("class", "form-control");
        input2.setAttribute("placeholder", "Length");
        input2.setAttribute("aria-label", "Length");
        input2.setAttribute("aria-describedby", "basic-addon1");
        newCell.appendChild(input2);
        
        newCell = newRow.insertCell();
        const button1 = document.createElement("button");
        button1.classList.add("btn");
        button1.classList.add("btn-outline-danger");
        button1.style.width = "80px";
        button1.style.height = "35px";
        button1.textContent = "Delete";
        newCell.appendChild(button1);

    })


    
    const btngen = document.querySelector("#btngen");
    btngen.addEventListener("click", () => {
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
                if (j == 0) {
                    // console.log(cell.innerHTML);
                    let text10 = cell.getElementsByTagName('input')[0];
                    console.log(text10.value);
                    obj = {...obj, name: text10.value};
                }
                if (j == 1) {
                    // console.log(cell.innerHTML);
                    var sel3 = cell.getElementsByTagName('select')[0];
                    console.log(sel3.value);

                    const func = genTypes.filter((d) => d.value == sel3.value)[0].func;
                    obj = {...obj, type: sel3.value, func: func};
                }
                if (j == 2) {
                    // console.log(cell.innerHTML);
                    let text11 = cell.getElementsByTagName('input')[0];
                    console.log(text11.value);
                    obj = {...obj, length: text11.value};
                }
			}
            fields.push(obj);
		}
        console.log(fields);
        const sel11 = document.querySelector(".select1");
        // console.log("sel11.value");
        // console.log(sel11.value);
        faker.locale = (sel11.value == "") ? "ja" : sel11.value;
        // console.log("faker.locale");
        // console.log(faker.locale);
        let outtext = [];
        for (let x=0; x<100; x++) {
            let ss = "";
            fields.map((d, index) => {
                if (index > 0) ss += ",";
                // console.log(d.type);
                // console.log(d.func());
                ss += d.func();
            })
            outtext.push(ss);
        }
        // console.log("locale is");
        // console.log(faker.locale);
        // console.log(outtext);
        const str7 = outtext.join("\n");
        const ta1 = document.querySelector("#ta1");
        ta1.textContent = str7;
    })
}
