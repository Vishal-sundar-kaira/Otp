const inputs=document.querySelectorAll(".otp-box input")
const verify=document.getElementById("verify")
const val=document.getElementById("val")
console.log(verify)
inputs.forEach((input,index)=>{
    input.dataset.index=index;//provide index to all inputs
    input.addEventListener("paste",handleOtppaste);
    input.addEventListener("keyup",handleOtp)
})
//it will handle to check pasted inputs and split it into array and will compare the length of array and 
//number of input fields.
function handleOtppaste(e){
    const data=e.clipboardData.getData("text");
    const value=data.split("");
    if(value.length===inputs.length){
        inputs.forEach((input,index)=>{input.value=value[index]});
        // submit();
    }
}
//This event trigger when user release a key if length is not full it will move to nextsibling element and 
//if backspace key is pressed it will move to previoussibling 
//if all inputs are filled verify button will enabled and on click submit will run.
function handleOtp(e){
    const input=e.target;
    let value=input.value;
    input.value=""
    input.value=value?value[0]:"";
    let fieldIndex=input.dataset.index;
    if(value.length>0 && fieldIndex<inputs.length-1){
        input.nextElementSibling.focus();
    }
    if (e.key === "Backspace" && fieldIndex > 0) {
        input.previousElementSibling.focus();
        input.previousElementSibling.value = value ? value[0] : ""; // Assign the value to the previous input field
      } else {
        input.value = value ? value[0] : "";
        if (value.length > 0 && fieldIndex < inputs.length - 1) {
          input.nextElementSibling.focus();
        }
      }
    if(fieldIndex==inputs.length-1){
        verify.disabled=false
        verify.addEventListener("click",submit)
    }
}
//submit button will take all otp numbers together and show them in html using innerhtml
//all inputs value will be disabled by adding new class.
function submit(){
    console.log("Submitting....!");
    let otp=""
    inputs.forEach((input)=>{
        otp += input.value;
        input.disabled=true;
        input.classList.add("disabled");
    });
    console.log(otp);
    val.innerHTML=otp

}
