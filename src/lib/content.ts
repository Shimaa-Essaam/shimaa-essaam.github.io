export type Language = 'en' | 'ar';
export type Bilingual = { en: string; ar: string };
export const pair = (en: string, ar: string): Bilingual => ({ en, ar });
export const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const asset = (path: string) => `${base}${path}`;
export const route = (lang: Language, path = '') => `${lang === 'ar' ? '/ar' : ''}${path ? '/' + path : ''}/`;
export const contact = {
 email: 'shimaaesaam72@gmail.com', phone: '+20 114 737 2924',
 linkedin: 'https://www.linkedin.com/in/shimaaesaam196014253/',
 whatsapp: (lang: Language) => `https://wa.me/201147372924?text=${encodeURIComponent(lang === 'en' ? 'Hi Shimaa! I would like to discuss a content project or work opportunity with you.' : 'أهلًا شيماء! حابب أتكلم معاكي عن مشروع محتوى أو فرصة عمل.')}`,
};
export type Category = 'video' | 'design' | 'strategy';
export type Project = { slug: string; brand: string; category: Category; title: Bilingual; subtitle: Bilingual; summary: Bilingual; audience: Bilingual; approach: Bilingual; role: Bilingual; cover: string; images?: string[]; videos?: string[]; documents?: { file: string; label: Bilingual; preview: string }[]; color: string };
export const categories = {
 all: pair('All work', 'كل الأعمال'), video: pair('Videos & scripts', 'الفيديوهات والسكريبتات'),
 design: pair('Social media designs', 'تصميمات السوشيال ميديا'), strategy: pair('Content planning', 'تخطيط المحتوى'),
};
export const videoTitles: Record<string, Bilingual> = {
 'video-01': pair('A question worth answering', 'سؤال يستحق الإجابة'),
 'video-02': pair('A space to get things done', 'مساحة تساعدك تنجز'),
 'video-03': pair('A moment of Spanish', 'دقيقة إسباني'),
 'video-04': pair('Spanish, made approachable', 'الإسباني بطريقة قريبة'),
 'video-05': pair('When studying feels familiar', 'لما المذاكرة تبقى حكايتنا'),
 'video-06': pair('A familiar face. A new context.', 'مشهد مألوف في سياق جديد'),
 'video-07': pair('A little German inspiration', 'خطوة نحو الألماني'),
 'video-08': pair('Language learning meets pop culture', 'تعلّم اللغات بروح خفيفة'),
 'video-09': pair('A conversation with Creativo', 'حوار مع كرياتيفو'),
 'video-10': pair('The relatable side of learning', 'الجانب الخفيف من التعلّم'),
 'video-11': pair('Learning, with a sense of humor', 'التعلّم بروح الفكاهة'),
};
export const durations: Record<string, string> = { 'video-01':'0:33','video-02':'0:24','video-03':'0:16','video-04':'0:40','video-05':'0:29','video-06':'0:27','video-07':'0:38','video-08':'0:17','video-09':'0:18','video-10':'0:15','video-11':'0:33' };
export const projects: Project[] = [
 { slug:'creativo-reels', brand:'Creativo Languages Institute', category:'video', color:'peach',
  title:pair('Making languages feel closer.', 'اللغات أقرب مما تتخيّل.'),
  subtitle:pair('Educational reels & presenter-led content', 'ريلز تعليمية ومحتوى مع المدرّسين'),
  summary:pair('Short-form content that puts the people and language-learning experience at Creativo in focus. Clear subtitles and carefully timed edits keep the message easy to follow.', 'محتوى قصير يسلّط الضوء على الأشخاص وتجربة تعلّم اللغات في كرياتيفو، مع نصوص واضحة على الشاشة ومونتاج يساعد على متابعة الرسالة.'),
  audience:pair('People exploring language courses and practical ways to improve their skills.', 'الأشخاص المهتمون بكورسات اللغات وتطوير مهاراتهم بشكل عملي.'),
  approach:pair('Build each reel around one message. Shape the script, edit the footage, and use on-screen text to support the spoken content.', 'تركيز كل فيديو على رسالة واحدة، مع كتابة السكريبت ومونتاج اللقطات وإضافة النصوص الداعمة للكلام.'),
  role:pair('Scriptwriting · Video editing', 'كتابة السكريبت · مونتاج الفيديو'), cover:'/images/video-04.jpg', videos:['video-04','video-01','video-03','video-07','video-09'] },
 { slug:'spanish-social-content', brand:'Creativo Languages Institute', category:'design',color:'cream',
  title:pair('A new language. A familiar voice.', 'لغة جديدة بصوت قريب.'),
  subtitle:pair('Spanish course social content', 'محتوى السوشيال لكورسات الإسباني'),
  summary:pair('A collection of Arabic social posts for Spanish learning. Everyday expressions, local references, and playful ideas bring the subject closer to the audience.', 'مجموعة منشورات عربية لتعلّم الإسباني، بتعبيرات يومية وإشارات محلية وأفكار خفيفة تقرّب الموضوع للجمهور.'),
  audience:pair('Arabic-speaking learners exploring Spanish courses, particularly in Tanta.', 'المهتمون بتعلّم الإسباني من الناطقين بالعربية، خصوصًا في طنطا.'),
  approach:pair('Pair a recognizable hook with a clear message. Move between course promotion, useful vocabulary, and posts that invite a response.', 'ربط بداية لافتة برسالة واضحة، والتنويع بين التعريف بالكورس والمفردات المفيدة والمنشورات التي تشجّع التفاعل.'),
  role:pair('Content ideas · Copywriting · Visual design', 'أفكار المحتوى · الكتابة · التصميم'), cover:'/images/image-09.webp', images:['image-09','image-02','image-01','image-03','image-04','image-05','image-10'] },
 { slug:'espacio-space',brand:'Espacio',category:'video',color:'rose',
  title:pair('More than a place to work.', 'مساحة لأكثر من مجرد شغل.'),
  subtitle:pair('A short-form space introduction', 'فيديو قصير للتعريف بالمكان'),
  summary:pair('A quick introduction to the Espacio space, combining interior footage, concise text, and a steady rhythm to give viewers a feel for the place.', 'تعريف سريع بمساحة إسباسيو، يجمع لقطات المكان مع نصوص مختصرة وإيقاع متوازن لنقل إحساس التجربة.'),
  audience:pair('People looking for a place to work, study, or meet.', 'الباحثون عن مساحة للشغل أو المذاكرة أو الاجتماعات.'),
  approach:pair('Let the space lead the story. Connect the shots with short on-screen phrases and an edit that keeps the tour moving.', 'جعل المكان محور الحكاية، وربط اللقطات بعبارات قصيرة ومونتاج يحافظ على انسيابية الجولة.'),
  role:pair('Scriptwriting · Video editing', 'كتابة السكريبت · مونتاج الفيديو'),cover:'/images/video-02.jpg',videos:['video-02'] },
 { slug:'relatable-language-content',brand:'Creativo Languages Institute',category:'video',color:'lilac',
  title:pair('A little humor goes a long way.', 'فكرة خفيفة تفتح الكلام.'),
  subtitle:pair('Relatable social video edits', 'فيديوهات اجتماعية بروح خفيفة'),
  summary:pair('Short edits that connect language learning with recognizable moments from popular culture. The captions add a new context and keep the message grounded in the audience’s everyday experience.', 'فيديوهات قصيرة تربط تعلّم اللغات بمواقف مألوفة من الثقافة الشعبية، مع نصوص تمنح اللقطات سياقًا جديدًا وقريبًا من تجربة الجمهور اليومية.'),
  audience:pair('Social media audiences who connect with humor and everyday learning situations.', 'جمهور السوشيال ميديا المتفاعل مع الفكاهة ومواقف التعلّم اليومية.'),
  approach:pair('Choose a relatable moment, write the framing message, and shape the timing through captions and editing.', 'اختيار موقف قريب من الجمهور، وكتابة الرسالة المناسبة، وضبط توقيتها بالنصوص والمونتاج.'),
  role:pair('Content adaptation · Scriptwriting · Video editing', 'توظيف المحتوى · كتابة السكريبت · المونتاج'),cover:'/images/video-05.jpg',videos:['video-05','video-06','video-08','video-10','video-11'] },
 { slug:'english-course-content',brand:'Creativo Languages Institute',category:'design',color:'peach',
  title:pair('English for everyday life.', 'إنجليزي للحياة اليومية.'),
  subtitle:pair('English course promotional content', 'محتوى تعريفي لكورسات الإنجليزي'),
  summary:pair('Social visuals that frame English learning around practical situations and a more approachable learning experience.', 'تصميمات اجتماعية تقدّم تعلّم الإنجليزي من خلال المواقف العملية وتجربة تعلّم أقرب للناس.'),
  audience:pair('Arabic-speaking learners looking for practical English courses.', 'المهتمون من الناطقين بالعربية بكورسات إنجليزي عملية.'),
  approach:pair('Use a direct headline, familiar visual references, and a clear course message within Creativo’s orange and cream visual language.', 'استخدام عنوان مباشر وعناصر بصرية مألوفة ورسالة واضحة، ضمن ألوان كرياتيفو البرتقالية والكريمية.'),
  role:pair('Copywriting · Visual design', 'كتابة المحتوى · التصميم'),cover:'/images/image-06.webp',images:['image-06','image-07'] },
 { slug:'espacio-accounting',brand:'Espacio',category:'design',color:'rose',
  title:pair('Skills beyond the certificate.', 'مهارة تتجاوز الشهادة.'),
  subtitle:pair('Accounting course promotional visuals', 'تصميمات تعريفية لكورس المحاسبة'),
  summary:pair('Two promotional directions for an accounting course, highlighting hands-on learning and the connection between study and practical work.', 'اتجاهان بصريان للتعريف بكورس محاسبة، يبرزان التطبيق العملي والربط بين الدراسة والشغل.'),
  audience:pair('People exploring accounting training and practical career skills.', 'المهتمون بالتدريب في المحاسبة واكتساب مهارات عملية للشغل.'),
  approach:pair('Lead with the value of practical experience, then use strong typographic hierarchy to make the course message easy to scan.', 'البدء بقيمة الخبرة العملية، ثم ترتيب العناوين والعناصر البصرية لتوصيل رسالة الكورس بسرعة.'),
  role:pair('Copywriting · Visual design', 'كتابة المحتوى · التصميم'),cover:'/images/image-11.webp',images:['image-11','image-08'] },
 { slug:'language-audience-research',brand:'Creativo Languages Institute',category:'strategy',color:'sage',
  title:pair('Good content starts with people.', 'المحتوى الجيد يبدأ من الجمهور.'),
  subtitle:pair('Buyer personas for language courses', 'شخصيات الجمهور لكورسات اللغات'),
  summary:pair('Audience-planning documents for English, German, and Spanish courses. These working profiles explore learner motivations, challenges, and possible messages to inform content planning.', 'ملفات تخطيط للجمهور المستهدف لكورسات الإنجليزي والألماني والإسباني، تستكشف دوافع المتعلّمين وتحدياتهم والرسائل الممكنة لتوجيه المحتوى.'),
  audience:pair('Prospective language learners with different study, career, and personal goals.', 'متعلّمون محتملون بأهداف دراسية ومهنية وشخصية مختلفة.'),
  approach:pair('Organize learner profiles around their goals and concerns, then connect those needs to relevant content angles. These are planning profiles, not measured campaign results.', 'تنظيم شرائح المتعلّمين حسب أهدافهم واهتماماتهم، وربط الاحتياجات بزوايا محتوى مناسبة. الملفات أدوات للتخطيط وليست نتائج حملات مقاسة.'),
  role:pair('Audience research · Content planning', 'دراسة الجمهور · تخطيط المحتوى'),cover:'/images/english-personas.png',documents:[
   {file:'english-buyer-personas.pdf',label:pair('English course personas','جمهور كورسات الإنجليزي'),preview:'english-personas.png'},
   {file:'german-buyer-personas.pdf',label:pair('German course personas','جمهور كورسات الألماني'),preview:'german-personas.png'},
   {file:'spanish-buyer-personas.pdf',label:pair('Spanish course personas','جمهور كورسات الإسباني'),preview:'spanish-personas.png'}] },
];
export const services = [
 {number:'01',title:pair('Words with a purpose.', 'كلمات لها هدف.'),name:pair('Content & scriptwriting','كتابة المحتوى والسكريبتات'),text:pair('Social copy, short-form scripts, and ideas shaped around your audience and your message.','نصوص للسوشيال ميديا وسكريبتات قصيرة وأفكار مبنية على جمهورك ورسالتك.')},
 {number:'02',title:pair('Stories in motion.', 'حكايات تتحرّك.'),name:pair('Video editing','مونتاج الفيديو'),text:pair('Reels with considered pacing, clear captions, and a story that is easy to follow.','ريلز بإيقاع متوازن ونصوص واضحة وحكاية سهلة المتابعة.')},
 {number:'03',title:pair('A visual point of view.', 'فكرة تتحوّل لصورة.'),name:pair('Social media design','تصميم السوشيال ميديا'),text:pair('Visual content that gives your message a recognizable look across social platforms.','محتوى بصري يمنح رسالتك شكلًا مميزًا عبر منصات التواصل.')},
 {number:'04',title:pair('Ideas with direction.', 'أفكار لها اتجاه.'),name:pair('Content planning','تخطيط المحتوى'),text:pair('Audience profiles, content angles, and calendars that give each piece a place in the bigger picture.','دراسة للجمهور وزوايا للمحتوى وخطط تجعل كل قطعة جزءًا من صورة متكاملة.')},
];
