var citeprocConsts = { style: '<?xml version="1.0" encoding="utf-8"?> \
<style xmlns="http://purl.org/net/xbiblio/csl" class="in-text" version="1.0" demote-non-dropping-particle="never"> \
  <!-- This style was edited with the Visual CSL Editor (http://steveridout.com/csl/visualEditor/) --> \
  <info> \
    <title>American Psychological Association 6th edition</title> \
    <title-short>APA</title-short> \
    <id>http://www.zotero.org/styles/apa</id> \
    <link href="http://www.zotero.org/styles/apa" rel="self"/> \
    <link href="http://owl.english.purdue.edu/owl/resource/560/01/" rel="documentation"/> \
    <author> \
      <name>Simon Kornblith</name> \
      <email>simon@simonster.com</email> \
    </author> \
    <contributor> \
      <name>Bruce DArcus</name> \
    </contributor> \
    <contributor> \
      <name>Curtis M. Humphrey</name> \
    </contributor> \
    <contributor> \
      <name>Richard Karnesky</name> \
      <email>karnesky+zotero@gmail.com</email> \
      <uri>http://arc.nucapt.northwestern.edu/Richard_Karnesky</uri> \
    </contributor> \
    <contributor> \
      <name>Sebastian Karcher</name> \
    </contributor> \
    <category citation-format="author-date"/> \
    <category field="psychology"/> \
    <category field="generic-base"/> \
    <updated>2014-08-23T06:25:45+00:00</updated> \
    <rights license="http://creativecommons.org/licenses/by-sa/3.0/">This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 License</rights> \
  </info> \
  <locale xml:lang="en"> \
    <terms> \
      <term name="editortranslator" form="short"> \
        <single>ed. &amp; trans.</single> \
        <multiple>eds. &amp; trans.</multiple> \
      </term> \
      <term name="translator" form="short"> \
        <single>trans.</single> \
        <multiple>trans.</multiple> \
      </term> \
    </terms> \
  </locale> \
  <macro name="container-contributors"> \
    <choose> \
      <if type="chapter paper-conference" match="any"> \
        <names variable="editor translator container-author" delimiter=", " suffix=", "> \
          <name and="symbol" initialize-with=". " delimiter=", "/> \
          <label form="short" prefix=" (" text-case="title" suffix=")"/> \
        </names> \
      </if> \
    </choose> \
  </macro> \
  <macro name="secondary-contributors"> \
    <choose> \
      <if type="article-journal chapter paper-conference" match="none"> \
        <names variable="translator editor container-author" delimiter=", " prefix=" (" suffix=")"> \
          <name and="symbol" initialize-with=". " delimiter=", "/> \
          <label form="short" prefix=", " text-case="title"/> \
        </names> \
      </if> \
    </choose> \
  </macro> \
  <macro name="author"> \
    <names variable="author"> \
      <name name-as-sort-order="all" and="symbol" sort-separator=", " initialize-with=". " delimiter=", " delimiter-precedes-last="always"/> \
      <label form="short" prefix=" (" suffix=")" text-case="capitalize-first"/> \
      <substitute> \
        <names variable="editor"/> \
        <names variable="translator"/> \
        <choose> \
          <if type="report"> \
            <text variable="publisher"/> \
            <text macro="title"/> \
          </if> \
          <else> \
            <text macro="title"/> \
          </else> \
        </choose> \
      </substitute> \
    </names> \
  </macro> \
  <macro name="author-short"> \
    <names variable="author"> \
      <name form="short" and="symbol" delimiter=", " initialize-with=". "/> \
      <substitute> \
        <names variable="editor"/> \
        <names variable="translator"/> \
        <choose> \
          <if type="report"> \
            <text variable="publisher"/> \
            <text variable="title" form="short" font-style="italic"/> \
          </if> \
          <else-if type="legal_case"> \
            <text variable="title" font-style="italic"/> \
          </else-if> \
          <else-if type="bill book graphic legislation motion_picture song" match="any"> \
            <text variable="title" form="short" font-style="italic"/> \
          </else-if> \
          <else> \
            <text variable="title" form="short" quotes="true"/> \
          </else> \
        </choose> \
      </substitute> \
    </names> \
  </macro> \
  <macro name="access"> \
    <choose> \
      <if type="thesis"> \
        <choose> \
          <if variable="archive" match="any"> \
            <group> \
              <text term="retrieved" text-case="capitalize-first" suffix=" "/> \
              <text term="from" suffix=" "/> \
              <text variable="archive" suffix="."/> \
              <text variable="archive_location" prefix=" (" suffix=")"/> \
            </group> \
          </if> \
          <else> \
            <group> \
              <text term="retrieved" text-case="capitalize-first" suffix=" "/> \
              <text term="from" suffix=" "/> \
              <text variable="URL"/> \
            </group> \
          </else> \
        </choose> \
      </if> \
      <else> \
        <choose> \
          <if variable="DOI"> \
            <text variable="DOI" prefix="doi:"/> \
          </if> \
          <else> \
            <choose> \
              <if type="webpage"> \
                <group delimiter=" "> \
                  <text term="retrieved" text-case="capitalize-first" suffix=" "/> \
                  <group> \
                    <date variable="accessed" form="text" suffix=", "/> \
                  </group> \
                  <text term="from"/> \
                  <text variable="URL"/> \
                </group> \
              </if> \
              <else> \
                <group> \
                  <text term="retrieved" text-case="capitalize-first" suffix=" "/> \
                  <text term="from" suffix=" "/> \
                  <text variable="URL"/> \
                </group> \
              </else> \
            </choose> \
          </else> \
        </choose> \
      </else> \
    </choose> \
  </macro> \
  <macro name="title"> \
    <choose> \
      <if type="report thesis book graphic motion_picture report song manuscript speech" match="any"> \
        <choose> \
          <if variable="version"> \
            <!---This is a hack until we have a computer program type --> \
            <text variable="title"/> \
          </if> \
          <else> \
            <text variable="title" font-style="italic"/> \
          </else> \
        </choose> \
      </if> \
      <else> \
        <text variable="title"/> \
      </else> \
    </choose> \
  </macro> \
  <macro name="title-plus-extra"> \
    <text macro="title"/> \
    <choose> \
      <if type="report thesis" match="any"> \
        <group prefix=" (" suffix=")" delimiter=" "> \
          <text variable="genre"/> \
          <text variable="number" prefix="No. "/> \
        </group> \
      </if> \
      <else-if type="post-weblog webpage" match="any"> \
        <text variable="genre" prefix=" [" suffix="]"/> \
      </else-if> \
      <else-if variable="version"> \
        <group delimiter=" " prefix=" (" suffix=")"> \
          <text term="version" text-case="capitalize-first"/> \
          <text variable="version"/> \
        </group> \
      </else-if> \
    </choose> \
  </macro> \
  <macro name="publisher"> \
    <choose> \
      <if type="report" match="any"> \
        <group delimiter=": "> \
          <text variable="publisher-place"/> \
          <text variable="publisher"/> \
        </group> \
      </if> \
      <else-if type="thesis" match="any"> \
        <group delimiter=", "> \
          <text variable="publisher"/> \
          <text variable="publisher-place"/> \
        </group> \
      </else-if> \
      <else-if type="post-weblog webpage" match="none"> \
        <group delimiter=", "> \
          <choose> \
            <if variable="event" type="speech" match="none"> \
              <text variable="genre"/> \
            </if> \
          </choose> \
          <choose> \
            <if type="article-journal article-magazine" match="none"> \
              <group delimiter=": "> \
                <choose> \
                  <if variable="publisher-place"> \
                    <text variable="publisher-place"/> \
                  </if> \
                  <else> \
                    <text variable="event-place"/> \
                  </else> \
                </choose> \
                <text variable="publisher"/> \
              </group> \
            </if> \
          </choose> \
        </group> \
      </else-if> \
    </choose> \
  </macro> \
  <macro name="event"> \
    <choose> \
      <if variable="container-title" match="none"> \
        <choose> \
          <if variable="event"> \
            <choose> \
              <if variable="genre" match="none"> \
                <text term="presented at" text-case="capitalize-first" suffix=" "/> \
                <text variable="event"/> \
              </if> \
              <else> \
                <group delimiter=" "> \
                  <text variable="genre" text-case="capitalize-first"/> \
                  <text term="presented at"/> \
                  <text variable="event"/> \
                </group> \
              </else> \
            </choose> \
          </if> \
          <else-if type="speech"> \
            <text variable="genre" text-case="capitalize-first"/> \
          </else-if> \
        </choose> \
      </if> \
    </choose> \
  </macro> \
  <macro name="issued"> \
    <choose> \
      <if type="bill legal_case legislation" match="none"> \
        <choose> \
          <if variable="issued"> \
            <group prefix=" (" suffix=")"> \
              <date variable="issued"> \
                <date-part name="year"/> \
              </date> \
              <text variable="year-suffix"/> \
              <choose> \
                <if type="article-journal bill book chapter graphic legal_case legislation motion_picture paper-conference report song" match="none"> \
                  <date variable="issued"> \
                    <date-part prefix=", " name="month"/> \
                    <date-part prefix=" " name="day"/> \
                  </date> \
                </if> \
              </choose> \
            </group> \
          </if> \
          <else> \
            <group prefix=" (" suffix=")"> \
              <text term="no date" form="short"/> \
              <text variable="year-suffix" prefix="-"/> \
            </group> \
          </else> \
        </choose> \
      </if> \
    </choose> \
  </macro> \
  <macro name="issued-sort"> \
    <choose> \
      <if type="article-journal bill book chapter graphic legal_case legislation motion_picture paper-conference report song" match="none"> \
        <date variable="issued"> \
          <date-part name="year"/> \
          <date-part name="month"/> \
          <date-part name="day"/> \
        </date> \
      </if> \
      <else> \
        <date variable="issued"> \
          <date-part name="year"/> \
        </date> \
      </else> \
    </choose> \
  </macro> \
  <macro name="issued-year"> \
    <choose> \
      <if variable="issued"> \
        <date variable="issued"> \
          <date-part name="year"/> \
        </date> \
        <text variable="year-suffix"/> \
      </if> \
      <else> \
        <text term="no date" form="short"/> \
        <text variable="year-suffix" prefix="-"/> \
      </else> \
    </choose> \
  </macro> \
  <macro name="edition"> \
    <choose> \
      <if is-numeric="edition"> \
        <group delimiter=" "> \
          <number variable="edition" form="ordinal"/> \
          <text term="edition" form="short"/> \
        </group> \
      </if> \
      <else> \
        <text variable="edition" suffix="."/> \
      </else> \
    </choose> \
  </macro> \
  <macro name="locators"> \
    <choose> \
      <if type="article-journal article-magazine" match="any"> \
        <group prefix=", " delimiter=", "> \
          <group> \
            <text variable="volume" font-style="italic"/> \
            <text variable="issue" prefix="(" suffix=")"/> \
          </group> \
          <text variable="page"/> \
        </group> \
      </if> \
      <else-if type="article-newspaper"> \
        <group delimiter=" " prefix=", "> \
          <label variable="page" form="short"/> \
          <text variable="page"/> \
        </group> \
      </else-if> \
      <else-if type="book graphic motion_picture report song chapter paper-conference" match="any"> \
        <group prefix=" (" suffix=")" delimiter=", "> \
          <text macro="edition"/> \
          <group> \
            <text term="volume" form="short" plural="true" text-case="capitalize-first" suffix=" "/> \
            <number variable="number-of-volumes" form="numeric" prefix="1-"/> \
          </group> \
          <group> \
            <text term="volume" form="short" text-case="capitalize-first" suffix=" "/> \
            <number variable="volume" form="numeric"/> \
          </group> \
          <group> \
            <label variable="page" form="short" suffix=" "/> \
            <text variable="page"/> \
          </group> \
        </group> \
      </else-if> \
      <else-if type="legal_case"> \
        <group prefix=" (" suffix=")" delimiter=" "> \
          <text variable="authority"/> \
          <date variable="issued" form="text"/> \
        </group> \
      </else-if> \
      <else-if type="bill legislation" match="any"> \
        <date variable="issued" prefix=" (" suffix=")"> \
          <date-part name="year"/> \
        </date> \
      </else-if> \
    </choose> \
  </macro> \
  <macro name="citation-locator"> \
    <group> \
      <choose> \
        <if locator="chapter"> \
          <label variable="locator" form="long" text-case="capitalize-first"/> \
        </if> \
        <else> \
          <label variable="locator" form="short"/> \
        </else> \
      </choose> \
      <text variable="locator" prefix=" "/> \
    </group> \
  </macro> \
  <macro name="container"> \
    <choose> \
      <if type="post-weblog webpage" match="none"> \
        <group> \
          <choose> \
            <if type="chapter paper-conference entry-encyclopedia" match="any"> \
              <text term="in" text-case="capitalize-first" suffix=" "/> \
            </if> \
          </choose> \
          <text macro="container-contributors"/> \
          <text macro="secondary-contributors"/> \
          <text macro="container-title"/> \
        </group> \
      </if> \
    </choose> \
  </macro> \
  <macro name="container-title"> \
    <choose> \
      <if type="article article-journal article-magazine article-newspaper" match="any"> \
        <text variable="container-title" font-style="italic" text-case="title"/> \
      </if> \
      <else-if type="bill legal_case legislation" match="none"> \
        <text variable="container-title" font-style="italic"/> \
      </else-if> \
    </choose> \
  </macro> \
  <macro name="legal-cites"> \
    <choose> \
      <if type="bill legal_case legislation" match="any"> \
        <group delimiter=" " prefix=", "> \
          <choose> \
            <if variable="container-title"> \
              <text variable="volume"/> \
              <text variable="container-title"/> \
              <group delimiter=" "> \
                <!--change to label variable="section" as that becomes available --> \
                <text term="section" form="symbol"/> \
                <text variable="section"/> \
              </group> \
              <text variable="page"/> \
            </if> \
            <else> \
              <choose> \
                <if type="legal_case"> \
                  <text variable="number" prefix="No. "/> \
                </if> \
                <else> \
                  <text variable="number" prefix="Pub. L. No. "/> \
                  <group delimiter=" "> \
                    <!--change to label variable="section" as that becomes available --> \
                    <text term="section" form="symbol"/> \
                    <text variable="section"/> \
                  </group> \
                </else> \
              </choose> \
            </else> \
          </choose> \
        </group> \
      </if> \
    </choose> \
  </macro> \
  <citation et-al-min="6" et-al-use-first="1" et-al-subsequent-min="3" et-al-subsequent-use-first="1" disambiguate-add-year-suffix="true" disambiguate-add-names="true" disambiguate-add-givenname="true" collapse="year" givenname-disambiguation-rule="primary-name"> \
    <sort> \
      <key macro="author"/> \
      <key macro="issued-sort"/> \
    </sort> \
    <layout prefix="(" suffix=")" delimiter="; "> \
      <group delimiter=", "> \
        <text macro="author-short"/> \
        <text macro="issued-year"/> \
        <text macro="citation-locator"/> \
      </group> \
    </layout> \
  </citation> \
  <bibliography hanging-indent="true" et-al-min="8" et-al-use-first="6" et-al-use-last="true" entry-spacing="0" line-spacing="2"> \
    <sort> \
      <key macro="author"/> \
      <key macro="issued-sort" sort="ascending"/> \
      <key macro="title"/> \
    </sort> \
    <layout> \
      <group suffix="."> \
        <group delimiter=". "> \
          <text macro="author"/> \
          <text macro="issued"/> \
          <text macro="title-plus-extra"/> \
          <text macro="container"/> \
        </group> \
        <text macro="legal-cites"/> \
        <text macro="locators"/> \
        <group delimiter=", " prefix=". "> \
          <text macro="event"/> \
          <text macro="publisher"/> \
        </group> \
      </group> \
      <text macro="access" prefix=" "/> \
    </layout> \
  </bibliography> \
</style> \
',
localsUsEn: '<?xml version="1.0" encoding="utf-8"?> \
<locale xmlns="http://purl.org/net/xbiblio/csl" version="1.0" xml:lang="en-US"> \
  <info> \
    <rights license="http://creativecommons.org/licenses/by-sa/3.0/">This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 License</rights> \
    <updated>2012-07-04T23:31:02+00:00</updated> \
  </info> \
  <style-options punctuation-in-quote="true" \
                 leading-noise-words="a,an,the" \
                 name-as-sort-order="ja zh kr my hu vi" \
                 name-never-short="ja zh kr my hu vi"/> \
  <date form="text"> \
    <date-part name="month" suffix=" "/> \
    <date-part name="day" suffix=", "/> \
    <date-part name="year"/> \
  </date> \
  <date form="numeric"> \
    <date-part name="month" form="numeric-leading-zeros" suffix="/"/> \
    <date-part name="day" form="numeric-leading-zeros" suffix="/"/> \
    <date-part name="year"/> \
  </date> \
  <terms> \
    <term name="radio-broadcast">radio broadcast</term> \
    <term name="television-broadcast">television broadcast</term> \
    <term name="podcast">podcast</term> \
    <term name="instant-message">instant message</term> \
    <term name="email">email</term> \
    <term name="number-of-volumes"> \
      <single>volume</single> \
      <multiple>volumes</multiple> \
    </term> \
    <term name="accessed">accessed</term> \
    <term name="and">and</term> \
    <term name="and" form="symbol">&amp;</term> \
    <term name="and others">and others</term> \
    <term name="anonymous">anonymous</term> \
    <term name="anonymous" form="short">anon.</term> \
    <term name="at">at</term> \
    <term name="available at">available at</term> \
    <term name="by">by</term> \
    <term name="circa">circa</term> \
    <term name="circa" form="short">c.</term> \
    <term name="cited">cited</term> \
    <term name="edition"> \
      <single>edition</single> \
      <multiple>editions</multiple> \
    </term> \
    <term name="edition" form="short">ed.</term> \
    <term name="et-al">et al.</term> \
    <term name="forthcoming">forthcoming</term> \
    <term name="from">from</term> \
    <term name="ibid">ibid.</term> \
    <term name="in">in</term> \
    <term name="in press">in press</term> \
    <term name="internet">internet</term> \
    <term name="interview">interview</term> \
    <term name="letter">letter</term> \
    <term name="no date">no date</term> \
    <term name="no date" form="short">n.d.</term> \
    <term name="online">online</term> \
    <term name="presented at">presented at the</term> \
    <term name="reference"> \
      <single>reference</single> \
      <multiple>references</multiple> \
    </term> \
    <term name="reference" form="short"> \
      <single>ref.</single> \
      <multiple>refs.</multiple> \
    </term> \
    <term name="retrieved">retrieved</term> \
    <term name="scale">scale</term> \
    <term name="version">version</term> \
 \
    <!-- ANNO DOMINI; BEFORE CHRIST --> \
    <term name="ad">AD</term> \
    <term name="bc">BC</term> \
 \
    <!-- PUNCTUATION --> \
    <term name="open-quote">“</term> \
    <term name="close-quote">”</term> \
    <term name="open-inner-quote">‘</term> \
    <term name="close-inner-quote">’</term> \
    <term name="page-range-delimiter">–</term> \
 \
    <!-- ORDINALS --> \
    <term name="ordinal">th</term> \
    <term name="ordinal-01">st</term> \
    <term name="ordinal-02">nd</term> \
    <term name="ordinal-03">rd</term> \
    <term name="ordinal-11">th</term> \
    <term name="ordinal-12">th</term> \
    <term name="ordinal-13">th</term> \
 \
    <!-- LONG ORDINALS --> \
    <term name="long-ordinal-01">first</term> \
    <term name="long-ordinal-02">second</term> \
    <term name="long-ordinal-03">third</term> \
    <term name="long-ordinal-04">fourth</term> \
    <term name="long-ordinal-05">fifth</term> \
    <term name="long-ordinal-06">sixth</term> \
    <term name="long-ordinal-07">seventh</term> \
    <term name="long-ordinal-08">eighth</term> \
    <term name="long-ordinal-09">ninth</term> \
    <term name="long-ordinal-10">tenth</term> \
 \
    <!-- LONG LOCATOR FORMS --> \
    <term name="book"> \
      <single>book</single> \
      <multiple>books</multiple> \
    </term> \
    <term name="chapter"> \
      <single>chapter</single> \
      <multiple>chapters</multiple> \
    </term> \
    <term name="column"> \
      <single>column</single> \
      <multiple>columns</multiple> \
    </term> \
    <term name="figure"> \
      <single>figure</single> \
      <multiple>figures</multiple> \
    </term> \
    <term name="folio"> \
      <single>folio</single> \
      <multiple>folios</multiple> \
    </term> \
    <term name="issue"> \
      <single>number</single> \
      <multiple>numbers</multiple> \
    </term> \
    <term name="line"> \
      <single>line</single> \
      <multiple>lines</multiple> \
    </term> \
    <term name="note"> \
      <single>note</single> \
      <multiple>notes</multiple> \
    </term> \
    <term name="opus"> \
      <single>opus</single> \
      <multiple>opera</multiple> \
    </term> \
    <term name="page"> \
      <single>page</single> \
      <multiple>pages</multiple> \
    </term> \
    <term name="paragraph"> \
      <single>paragraph</single> \
      <multiple>paragraph</multiple> \
    </term> \
    <term name="part"> \
      <single>part</single> \
      <multiple>parts</multiple> \
    </term> \
    <term name="section"> \
      <single>section</single> \
      <multiple>sections</multiple> \
    </term> \
    <term name="sub verbo"> \
      <single>sub verbo</single> \
      <multiple>sub verbis</multiple> \
    </term> \
    <term name="verse"> \
      <single>verse</single> \
      <multiple>verses</multiple> \
    </term> \
    <term name="volume"> \
      <single>volume</single> \
      <multiple>volumes</multiple> \
    </term> \
 \
    <!-- SHORT LOCATOR FORMS --> \
    <term name="book" form="short">bk.</term> \
    <term name="chapter" form="short">chap.</term> \
    <term name="column" form="short">col.</term> \
    <term name="figure" form="short">fig.</term> \
    <term name="folio" form="short">f.</term> \
    <term name="issue" form="short">no.</term> \
    <term name="line" form="short">l.</term> \
    <term name="note" form="short">n.</term> \
    <term name="opus" form="short">op.</term> \
    <term name="page" form="short"> \
      <single>p.</single> \
      <multiple>pp.</multiple> \
    </term> \
    <term name="paragraph" form="short">para.</term> \
    <term name="part" form="short">pt.</term> \
    <term name="section" form="short">sec.</term> \
    <term name="sub verbo" form="short"> \
      <single>s.v.</single> \
      <multiple>s.vv.</multiple> \
    </term> \
    <term name="verse" form="short"> \
      <single>v.</single> \
      <multiple>vv.</multiple> \
    </term> \
    <term name="volume" form="short"> \
      <single>vol.</single> \
      <multiple>vols.</multiple> \
    </term> \
 \
    <!-- SYMBOL LOCATOR FORMS --> \
    <term name="paragraph" form="symbol"> \
      <single>¶</single> \
      <multiple>¶¶</multiple> \
    </term> \
    <term name="section" form="symbol"> \
      <single>§</single> \
      <multiple>§§</multiple> \
    </term> \
 \
    <!-- LONG ROLE FORMS --> \
    <term name="director"> \
      <single>director</single> \
      <multiple>directors</multiple> \
    </term> \
    <term name="editor"> \
      <single>editor</single> \
      <multiple>editors</multiple> \
    </term> \
    <term name="editorial-director"> \
      <single>editor</single> \
      <multiple>editors</multiple> \
    </term> \
    <term name="illustrator"> \
      <single>illustrator</single> \
      <multiple>illustrators</multiple> \
    </term> \
    <term name="translator"> \
      <single>translator</single> \
      <multiple>translators</multiple> \
    </term> \
    <term name="editortranslator"> \
      <single>editor &amp; translator</single> \
      <multiple>editors &amp; translators</multiple> \
    </term> \
 \
    <!-- SHORT ROLE FORMS --> \
    <term name="director" form="short"> \
      <single>dir.</single> \
      <multiple>dirs.</multiple> \
    </term> \
    <term name="editor" form="short"> \
      <single>ed.</single> \
      <multiple>eds.</multiple> \
    </term> \
    <term name="editorial-director" form="short"> \
      <single>ed.</single> \
      <multiple>eds.</multiple> \
    </term> \
    <term name="illustrator" form="short"> \
      <single>ill.</single> \
      <multiple>ills.</multiple> \
    </term> \
    <term name="translator" form="short"> \
      <single>tran.</single> \
      <multiple>trans.</multiple> \
    </term> \
    <term name="editortranslator" form="short"> \
      <single>ed. &amp; tran.</single> \
      <multiple>eds. &amp; trans.</multiple> \
    </term> \
 \
    <!-- VERB ROLE FORMS --> \
    <term name="director" form="verb">directed by</term> \
    <term name="editor" form="verb">edited by</term> \
    <term name="editorial-director" form="verb">edited by</term> \
    <term name="illustrator" form="verb">illustrated by</term> \
    <term name="interviewer" form="verb">interview by</term> \
    <term name="recipient" form="verb">to</term> \
    <term name="reviewed-author" form="verb">by</term> \
    <term name="translator" form="verb">translated by</term> \
    <term name="editortranslator" form="verb">edited &amp; translated by</term> \
 \
    <!-- SHORT VERB ROLE FORMS --> \
    <term name="container-author" form="verb-short">by</term> \
    <term name="director" form="verb-short">dir.</term> \
    <term name="editor" form="verb-short">ed.</term> \
    <term name="editorial-director" form="verb-short">ed.</term> \
    <term name="illustrator" form="verb-short">illus.</term> \
    <term name="translator" form="verb-short">trans.</term> \
    <term name="editortranslator" form="verb-short">ed. &amp; trans.</term> \
 \
    <!-- LONG MONTH FORMS --> \
    <term name="month-01">January</term> \
    <term name="month-02">February</term> \
    <term name="month-03">March</term> \
    <term name="month-04">April</term> \
    <term name="month-05">May</term> \
    <term name="month-06">June</term> \
    <term name="month-07">July</term> \
    <term name="month-08">August</term> \
    <term name="month-09">September</term> \
    <term name="month-10">October</term> \
    <term name="month-11">November</term> \
    <term name="month-12">December</term> \
 \
    <!-- SHORT MONTH FORMS --> \
    <term name="month-01" form="short">Jan.</term> \
    <term name="month-02" form="short">Feb.</term> \
    <term name="month-03" form="short">Mar.</term> \
    <term name="month-04" form="short">Apr.</term> \
    <term name="month-05" form="short">May</term> \
    <term name="month-06" form="short">Jun.</term> \
    <term name="month-07" form="short">Jul.</term> \
    <term name="month-08" form="short">Aug.</term> \
    <term name="month-09" form="short">Sep.</term> \
    <term name="month-10" form="short">Oct.</term> \
    <term name="month-11" form="short">Nov.</term> \
    <term name="month-12" form="short">Dec.</term> \
 \
    <!-- SEASONS --> \
    <term name="season-01">Spring</term> \
    <term name="season-02">Summer</term> \
    <term name="season-03">Autumn</term> \
    <term name="season-04">Winter</term> \
  </terms> \
</locale> \
'};
