import { ref } from 'vue'

// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import UploadAdapterPlugin from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
// import ImagePlugin from '@ckeditor/ckeditor5-image/src/image';
// import ImageCaptionPlugin from '@ckeditor/ckeditor5-image/src/imagecaption';
// import ImageStylePlugin from '@ckeditor/ckeditor5-image/src/imagestyle';
// import ImageToolbarPlugin from '@ckeditor/ckeditor5-image/src/imagetoolbar';
// import ImageUploadPlugin from '@ckeditor/ckeditor5-image/src/imageupload';

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
// Style of the working
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import StrikeThroughPlugin from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import CodePlugin from '@ckeditor/ckeditor5-basic-styles/src/code';
import BlockQuotePlugin from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CodeBlockPlugin from '@ckeditor/ckeditor5-code-block/src/codeblock'
// Bullet, List, Link, Table
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import ListPlugin from '@ckeditor/ckeditor5-list/src/list';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';

// Header, Alignment
import HeadingPlugin from '@ckeditor/ckeditor5-heading/src/heading';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import AlignmentPlugin from '@ckeditor/ckeditor5-alignment/src/alignment'
// import FontFamilyPlugin from '@ckeditor/ckeditor5-font/src/fontfamily'
import FontSizePlugin from '@ckeditor/ckeditor5-font/src/fontsize'
import WordCountPlugin from '@ckeditor/ckeditor5-word-count/src/wordcount'

const ckEditConfig = () => {
    const editor = ClassicEditor
    const wordsCount = ref('')
    const charsCount = ref('')
    const customColorPalette = [
        {
            color: 'hsl(4, 90%, 58%)',
            label: 'Red'
        },
        {
            color: 'hsl(340, 82%, 52%)',
            label: 'Pink'
        },
        {
            color: 'hsl(291, 64%, 42%)',
            label: 'Purple'
        },
        {
            color: 'hsl(262, 52%, 47%)',
            label: 'Deep Purple'
        },
        {
            color: 'hsl(231, 48%, 48%)',
            label: 'Indigo'
        },
        {
            color: 'hsl(207, 90%, 54%)',
            label: 'Blue'
        },
    ]

    const editorConfig = {
        plugins: [
            EssentialsPlugin,
            BoldPlugin,
            ItalicPlugin,
            StrikeThroughPlugin,
            BlockQuotePlugin,
            HeadingPlugin,
            // ImagePlugin,
            // ImageCaptionPlugin,
            // ImageStylePlugin,
            // ImageToolbarPlugin,
            // ImageUploadPlugin,
            LinkPlugin,
            ListPlugin,
            ParagraphPlugin,
            // UploadAdapterPlugin,
            CodePlugin,
            AlignmentPlugin,
            CodeBlockPlugin,
            // FontFamilyPlugin,
            FontSizePlugin,
            WordCountPlugin,
            Table,
            TableToolbar,
            TableProperties,
            TableCellProperties
        ],
        toolbar: [
            'heading',
            'bold',
            'italic',
            'strikethrough',
            'code',
            'link',
            // 'fontfamily',
            'alignment',
            'fontsize',
            'bulletedList',
            'numberedList',
            'insertTable',
            'blockQuote',
            'codeblock',
            'undo',
            'redo',
        ],
        wordCount: {
            onUpdate: stats => {
            // Prints the current content statistics.
            wordsCount.value = stats.words
            charsCount.value = stats.characters
            // console.log( `Characters: ${ stats.characters }\nWords: ${ stats.words }` );
            }
        },
        table: {
            contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'],
            tableProperties: {
            borderColors: customColorPalette,
            backgroundColors: customColorPalette
        },
            // Set the palettes for table cells.
            tableCellProperties: {
                borderColors: customColorPalette,
                backgroundColors: customColorPalette
            }
        }
    }

    return { editor, editorConfig, wordsCount, charsCount }
}

export default ckEditConfig