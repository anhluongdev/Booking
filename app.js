//HÀM RENDER KHUNG GIỜ
let text = "";
const begin = 7200000;  //9:30
const end = 48600000;   //20:30
const step = 1800000;   //30p

for (let i = begin; i <= end; i++) {
  let j = i % step;
  if (j == 0) {
  	let day = new Date(i);
  	text += `<a href='' class="timeFrame__ele"> ${day.toString().substr(16,5)} </a>` + "<br>";
  }
  
}
document.getElementById("time__frame").innerHTML = text;

/*VALIDATION*/

//Tên
document.documentElement.addEventListener('submit', function() {
    let name = document.getElementById('info__name');
    let nameValue = name.value;
    if (nameValue == '') {
        document.getElementById('nameValid').innerHTML = "Hãy nhập họ tên";
    } else {
        document.getElementById('nameValid').innerHTML = '';
    }
});
document.getElementById('info__name').addEventListener('keyup', function() {
    let name = document.getElementById('info__name');
    let nameValue = name.value;
    if (nameValue == '') {
        document.getElementById('nameValid').innerHTML = "Hãy nhập họ tên";
    } else {
        document.getElementById('nameValid').innerHTML = '';
    }
});

//SĐT
document.documentElement.addEventListener('submit', function() {
    let number = document.getElementById('info__number');
    let numberValue = number.value;
    if (numberValue == '') {
        document.getElementById('numberValid').innerHTML = "Hãy nhập SĐT";
    } else {
        document.getElementById('numberValid').innerHTML = '';
    }
});
document.getElementById('info__number').addEventListener('keyup', function() {
    let number = document.getElementById('info__number');
    let numberValue = number.value;
    let regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    let check = regex.test(numberValue);
    if (numberValue == '') {
        document.getElementById('numberValid').innerHTML = "Hãy nhập SĐT";
    } else if (check) {
        document.getElementById('numberValid').innerHTML = '';
    } else {
        document.getElementById('numberValid').innerHTML = 'SĐT bao gồm 10 số và bắt đầu từ số 0';
    }
});
// Tổng số khách
document.querySelector("input[type='number'").addEventListener('keyup', function() {
    let quantity = document.querySelector("input[type='number'").value;
    let regex = /[0-9]/;    
    let check = regex.test(quantity);
    if (Number(quantity) < 0 || Number(quantity) > 10) {
        document.getElementById('quantityValid').innerHTML = "Nhập số lượng từ 1 tới 10";
    } else if (Number.isInteger(Number(quantity)) == false || check == false) {
        document.getElementById('quantityValid').innerHTML = 'Nhập số lượng từ 1 tới 10';
    } else {
        document.getElementById('quantityValid').innerHTML = '';
    }
});

//Chi nhánh và ktv
/*
    2 cách
*/

// Cách 1:
let flag1 = document.getElementById('brand1');
let flag2 = document.getElementById('brand2');
let flag3 = document.getElementById('brand3');


flag1.addEventListener('click', function() {
    document.getElementById('ktv__option1').style.display = 'block';
    document.getElementById('ktv__option2').style.display = 'none';
    document.getElementById('ktv__option3').style.display = 'none';
})
flag2.addEventListener('click', function() {
    document.getElementById('ktv__option2').style.display = 'block';
    document.getElementById('ktv__option1').style.display = 'none';
    document.getElementById('ktv__option3').style.display = 'none';
})
flag3.addEventListener('click', function() {
    document.getElementById('ktv__option3').style.display = 'block';
    document.getElementById('ktv__option2').style.display = 'none';
    document.getElementById('ktv__option1').style.display = 'none';
})

// Cách 2:
    /*
        B1: Gọi event click cho từng thẻ input[type="radio"]
        B2: Khi click vào thẻ nào sẽ gán thuộc tính checked cho thẻ đó và xóa checked trong thẻ cũ
        B3: Gọi các biến flag1, flag2, flag3 tương ứng với các checked xuất hiện trong các thẻ input
        B4: Nếu flag1 == true thì hiển thị ktv__option1, tương tự với các flag2 và flag3
        (Lưu ý: display none toàn bộ các ktv__option)
    */

//Dịch vụ

let serviceClass = document.getElementsByClassName('serviceOption__add');
let currentLength = 1;
let countId = 1;
document.getElementById('serviceOption__btn').addEventListener('click', function() {
    let newEle = document.getElementById('wrapServiceOption__addId');
    let lengthTong = newEle.children.length;
    
    // Nếu có trên 2 dịch vụ sẽ hiển thị nút xóa
    if (lengthTong + 1 > 1) {
        for (let i = 0; i < lengthTong; i++) {
            newEle.children[i].childNodes[2].style.display = 'block';
            newEle.children[i].childNodes[3].style.display = 'none';
        }
    } 
    
    // Thêm dịch vụ

    let service = document.getElementById('wrapServiceOption__addId').children[0];
    let newService = service.cloneNode(true);
    
    if (currentLength < 10) {
        let attr = document.createAttribute('id');
        attr.value = 'serviceOption__addId' + countId;
        newService.setAttributeNode(attr);
        newEle.appendChild(newService);
        countId++;
        currentLength++;
        // document.getElementById('serviceOption__moreId').children[0].disabled = false;
    } 
    else {
        alert('Tối đa 10 dịch vụ!')
        // document.getElementById('serviceOption__moreId').children[0].disabled = true;
    }
    
    console.log('Sau cong: ' + currentLength);
    // Xóa dịch vụ
        // Khi xóa node gốc
    service.childNodes[2].addEventListener('click', function() {
        service.parentNode.removeChild(service);
        currentLength--;
        if (currentLength <= 1) {   
            for (let i = 0; i < lengthTong; i++) {
                newEle.children[i].childNodes[2].style.display = 'none';
                newEle.children[i].childNodes[3].style.display = 'block';
            }
        }
    })
        // Khi xóa node clone
    newService.childNodes[2].addEventListener('click', function() {
        newService.parentNode.removeChild(newService);
        currentLength--;
        // Nếu xóa còn lại 1 dịch vụ sẽ disabled nút xóa
        if (currentLength <= 1) {   
            for (let i = 0; i < lengthTong; i++) {
                newEle.children[i].childNodes[2].style.display = 'none';
                newEle.children[i].childNodes[3].style.display = 'block';
            }
        }
        console.log('Sau tru: ' + currentLength);
    })
    // console.log("length tong: " + currentLength);
    
})

// Tính tiền và tính thời gian
let arrTime = [];
let arrPrice = [];

function changeValue(obj) {
    let service = document.getElementById('service');
    let value = obj.value;
    for (let i = 0; i < service.children.length; i++) {
        if (value === service.children[i].value) {
            //Lấy giá trị valueTime của option gán cho thẻ select
            let eleTime = (service.children[i].getAttribute('valueTime'));
            service.setAttribute('valueTime', eleTime);
            
            //Lấy giá trị valuePrice của option gán cho thẻ select
            let elePrice = (service.children[i].getAttribute('valuePrice'));
            service.setAttribute('valuePrice', elePrice);
        }
    }
    let select = document.getElementsByClassName('serviceOption__add--name');
    for (let i = 0; i < select.length; i++) {
        let eleTime = Number(select[i].getAttribute('valueTime'));
        let elePrice = Number(select[i].getAttribute('valuePrice'));
        arrTime[i] = eleTime;
        arrPrice[i] = elePrice;
    }
    console.log(arrTime);
    console.log(arrPrice);
}









 


