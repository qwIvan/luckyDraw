//抽奖人员名单
var allPerson = "11;Andy;Baal;C27;graveyard;Jacky Cai;Jane;JaronTam;Leo;Owen;seven;Tiffany Sun ;Wang Diyu;WinkeyWong;安静;奥德彪;贝多芬;蔡朝东;陈博钊;陈春喜;陈嘉琪;陈江峰;陈丽敏;陈敏骏;陈鹏莉;陈升;陈廷峰;陈晓琳;陈燕玲;陈喆涵;陈震磊;陈忠兴;陈宗力;初延泽;代宪层;邓豪;董链梅;樊智勇;方耿帆;冯茗楷;郭志军;何宏涛;何加一;何女士;何志仁;洪城江;洪镇;侯先生;胡家宁;黄琳;黄昱;黄越;姜开;江碧莹;康林;孔;蓝凯慧;黎泽楷;李彬;李福祥;李海森;李恒辉;李奎;李秋晓;李权;李绍兴;李元;梁志刚;梁智鹏;廖豪兴;廖煜嵘;林海;林敏;林志杰;刘阳;卢锴鸿;陆旸;鹿诚龙;罗恒;马思怡;马曦丽;马泽敏;孟帅;潘豪辉;潘乾;潘政峰;鹏哥;琪楂丁丁;秦鑫炎;丘成志;苏;苏睿霖;苏泽恩;谈剑;谭凯阳;谭颖诗;唐心儿;唐源;王炳宇;王浩洋;王一乔;王宇;文一帆;吴;吴德权;吴显衡;吴欣洋;吴志洪;向少奕;谢家炜;谢伟;炘渊;徐孟晗;严浩儿;严惠涛;嚴;杨健辉;杨键宇;杨一诺;叶先生;叶增健;银。;印木之;余波;俞斌;鱼丸;袁进;詹瑞璋;张丙涛;张桂滨;张洪银;张秋龙;赵昕;郑佳欣;郑伟;智勇;钟思彦;钟钰铟;周龙华;周民帅;朱飞静;邹骁盛;Joly";
//领导人员名单
var leaderArr = [];
//未中奖人员名单
var remainPerson = allPerson.toString().split(";");
console.log('length', remainPerson.length)
//中奖人员名单
var luckyMan = [];
var timer;//定时器
var times = 1;//抽奖次数,如果不是第一次，不加粗显示领导姓名
$(function () {
    iconAnimation();
    //开始抽奖
    $("#btnStart").on("click", function () {
        //判断是开始还是结束
        if ($("#btnStart").text() === "开始") {
            if (!$("#txtNum").val()) {
                showDialog("请输入中奖人数");
                return false;
            }
            if ($("#txtNum").val() > 49) {
                showDialog("一次最多只能输入49人");
                return false;
            }
            if ($("#txtNum").val() > remainPerson.length) {
                showDialog("当前抽奖人数大于奖池总人数<br>当前抽奖人数：<b>" + $("#txtNum").val() + "</b>人,奖池人数：<b>" + remainPerson.length + "</b>人");
                return false;
            }
            $("#result").fadeOut();
            //显示动画框，隐藏中奖框
            $("#luckyDrawing").show().next().addClass("hide");
            move();
            $("#btnStart").text("停止");
            $("#bgLuckyDrawEnd").removeClass("bg");
        }
        else {
            $("#btnStart").text("开始");//设置按钮文本为开始
            var luckyDrawNum = $("#txtNum").val();
            startLuckDraw();//抽奖开始

            $("#luckyDrawing").fadeOut();
            clearInterval(timer);//停止输入框动画展示
            $("#luckyDrawing").val(luckyMan[luckyMan.length - 1]);//输入框显示最后一个中奖名字
            $("#result").fadeIn().find("div").removeClass().addClass("p" + luckyDrawNum);//隐藏输入框，显示中奖框
            $("#bgLuckyDrawEnd").addClass("bg");//添加中奖背景光辉
            $("#txtNum").attr("placeholder", "输入中奖人数");
        }
    });

    $("#btnReset").on("click", function () {
        //确认重置对话框
        var confirmReset = false;
        showConfirm("确认重置吗？所有已中奖的人会重新回到抽奖池！", function () {
            //熏置未中奖人员名单
            remainPerson = allPerson.toString().split(";");
            //中奖人数框置空
            $("#txtNum").val("").attr("placeholder", "请输入中奖人数");
            $("#showName").val("");
            //隐藏中奖名单,然后显示抽奖框
            $("#result").fadeOut();//.prev().fadeIn()
            $("#bgLuckyDrawEnd").removeClass("bg");//移除背景光辉
            times++;
            console.log(times);

        });
    });
});

//抽奖主程序
function startLuckDraw() {
    //抽奖人数
    var luckyDrawNum = $("#txtNum").val();
    if (luckyDrawNum > remainPerson.length) {
        alert("抽奖人数大于奖池人数！请修改人数。或者点重置开始将新一轮抽奖！");
        return false;
    }
    //随机中奖人
    var randomPerson = getRandomArrayElements(remainPerson, luckyDrawNum);
    var tempHtml = "";
    $.each(randomPerson, function (i, person) {
        if (leaderArr.indexOf(person) > -1 && times == 1) {
            tempHtml += "<span><b>" + person + "</b></span>";
        }
        else {
            tempHtml += "<span>" + person + "</span>";
        }
    });
    $("#result>div").html(tempHtml);
    //剩余人数剔除已中奖名单
    remainPerson = remainPerson.delete(randomPerson);
    //中奖人员
    luckyMan = luckyMan.concat(randomPerson);
    //设置抽奖人数框数字为空
    $("#txtNum").val("");
}

//参考这篇文章：http://www.html-js.com/article/JS-rookie-rookie-learned-to-fly-in-a-moving-frame-beating-figures
//跳动的数字
function move() {
    var $showName = $("#showName"); //显示内容的input的ID
    var interTime = 30;//设置间隔时间
    timer = setInterval(function () {
        var i = GetRandomNum(0, remainPerson.length);
        $showName.val(remainPerson[i]);//输入框赋值
    }, interTime);
}

//顶上的小图标，随机动画
function iconAnimation() {
    var interTime = 200;//设置间隔时间
    var $icon = $("#iconDiv>span");
    var arrAnimatoin = ["bounce", "flash", "pulse", "rubberBand", "shake", "swing", "wobble", "tada"];
    var timer2 = setInterval(function () {
        var i = GetRandomNum(0, $icon.length);
        var j = GetRandomNum(0, arrAnimatoin.length);
        //console.log("i:" + i + ",j:" + j);
        $($icon[i]).removeClass().stop().addClass("animated " + arrAnimatoin[j]);//输入框赋值
    }, interTime);

}
