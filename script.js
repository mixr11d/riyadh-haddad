/* ==========================================================================
   1. إعدادات ومعرفات إعلانات جوجل (تعديل من مكان واحد لكل الموقع)
   ========================================================================== */
const G_ID = 'AW-xxxxx'; // استبدل xxxxx بمعرف الحساب لاحقاً (مثال: AW-123456789)
const C_L = 'xxxxx';    // استبدل xxxxx بلابل الاتصال لاحقاً (مثال: ab_cDEfGhIjK)
const W_L = 'xxxxx';    // استبدل xxxxx بلابل الواتساب لاحقاً (مثال: xy_z1234567)

/* ==========================================================================
   2. تحميل وتحميل كود تتبع جوجل تلقائياً في كل الصفحات
   ========================================================================== */
(function() {
    // إنشاء عنصر الـ script وحقنه ديناميكياً في رأس الصفحة
    var gScript = document.createElement('script');
    gScript.async = true;
    gScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + G_ID;
    document.head.appendChild(gScript);
})();

// إعدادات الـ dataLayer الافتراضية
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', G_ID);

/* ==========================================================================
   3. مستشعر رصد النقرات التلقائي لإعلانات جوجل (اتصال وواتساب)
   ========================================================================== */
document.addEventListener('click', function(e) {
    // البحث عن أقرب عنصر رابط تم النقر عليه
    var a = e.target.closest('a');
    if (!a) return;
    
    var href = a.href || '';
    
    // رصد نقرة الاتصال الهاتفي وإرسال التحويل لجوجل
    if (href.startsWith('tel:')) {
        gtag('event', 'conversion', {
            'send_to': G_ID + '/' + C_L,
            'value': 50.0,
            'currency': 'SAR'
        });
    }
    
    // رصد نقرة الواتساب وإرسال التحويل لجوجل
    if (href.includes('wa.me') || href.includes('whatsapp')) {
        gtag('event', 'conversion', {
            'send_to': G_ID + '/' + W_L,
            'value': 40.0,
            'currency': 'SAR'
        });
    }
}, true);

/* ==========================================================================
   4. تفعيل وإغلاق قائمة الجوال (Hamburger Menu)
   ========================================================================== */
// فحص المعرفين لضمان العمل على أي هيكلية HTML في الهيدر
const menuToggle = document.getElementById('menuToggle') || document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // منع انتقال النقرة لإبقاء القائمة مستقرة
        navMenu.classList.toggle('open');
    });

    // إغلاق القائمة تلقائياً عند النقر خارجها لتسهيل تصفح الزائر
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('open');
        }
    });
}

/* ==========================================================================
   5. تشغيل حركة زر الصعود للأعلى (Back To Top) بمرونة وسلاسة
   ========================================================================== */
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    // يظهر الزر في جهة اليسار فوراً بعد النزول بمقدار 300 بكسل
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// تنفيذ حركة الصعود الناعمة والمريحة للعين عند النقر
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
