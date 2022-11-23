export const foo = 1;
// // This feels slightly deranged but apparently Vite doesn't support dynamic imports at all
// // So we have to manually statically import all the icons we're using...

// import { ICON_TYPES } from "@elastic/eui";
// import { ValuesType } from "utility-types";

// import { appendIconComponentCache } from "@elastic/eui/es/components/icon/icon";

// import { icon as string } from "@elastic/eui/es/components/icon/assets/string";
// import { icon as number } from "@elastic/eui/es/components/icon/assets/number";
// import { icon as link } from "@elastic/eui/es/components/icon/assets/link";
// import { icon as menu } from "@elastic/eui/es/components/icon/assets/menu";
// import { icon as filter } from "@elastic/eui/es/components/icon/assets/filter";
// import { icon as image } from "@elastic/eui/es/components/icon/assets/image";
// import { icon as stop } from "@elastic/eui/es/components/icon/assets/stop";
// import { icon as alert } from "@elastic/eui/es/components/icon/assets/alert";
// import { icon as document } from "@elastic/eui/es/components/icon/assets/document";
// import { icon as grid } from "@elastic/eui/es/components/icon/assets/grid";
// import { icon as list } from "@elastic/eui/es/components/icon/assets/list";
// import { icon as search } from "@elastic/eui/es/components/icon/assets/search";
// import { icon as temperature } from "@elastic/eui/es/components/icon/assets/temperature";
// import { icon as color } from "@elastic/eui/es/components/icon/assets/color";
// import { icon as accessibility } from "@elastic/eui/es/components/icon/assets/accessibility";
// import { icon as aggregate } from "@elastic/eui/es/components/icon/assets/aggregate";
// import { icon as analyzeEvent } from "@elastic/eui/es/components/icon/assets/analyzeEvent";
// import { icon as annotation } from "@elastic/eui/es/components/icon/assets/annotation";
// import { icon as apps } from "@elastic/eui/es/components/icon/assets/apps";
// import { icon as arrowStart } from "@elastic/eui/es/components/icon/assets/arrowStart";
// import { icon as arrowEnd } from "@elastic/eui/es/components/icon/assets/arrowEnd";
// import { icon as asterisk } from "@elastic/eui/es/components/icon/assets/asterisk";
// import { icon as beaker } from "@elastic/eui/es/components/icon/assets/beaker";
// import { icon as bell } from "@elastic/eui/es/components/icon/assets/bell";
// import { icon as bellSlash } from "@elastic/eui/es/components/icon/assets/bellSlash";
// import { icon as bolt } from "@elastic/eui/es/components/icon/assets/bolt";
// import { icon as branch } from "@elastic/eui/es/components/icon/assets/branch";
// import { icon as branchUser } from "@elastic/eui/es/components/icon/assets/branchUser";
// import { icon as broom } from "@elastic/eui/es/components/icon/assets/broom";
// import { icon as brush } from "@elastic/eui/es/components/icon/assets/brush";
// import { icon as bug } from "@elastic/eui/es/components/icon/assets/bug";
// import { icon as bullseye } from "@elastic/eui/es/components/icon/assets/bullseye";
// import { icon as calendar } from "@elastic/eui/es/components/icon/assets/calendar";
// import { icon as check } from "@elastic/eui/es/components/icon/assets/check";
// import { icon as checkInCircleFilled } from "@elastic/eui/es/components/icon/assets/checkInCircleFilled";
// import { icon as cheer } from "@elastic/eui/es/components/icon/assets/cheer";
// import { icon as clock } from "@elastic/eui/es/components/icon/assets/clock";
// import { icon as cloudDrizzle } from "@elastic/eui/es/components/icon/assets/cloudDrizzle";
// import { icon as cloudStormy } from "@elastic/eui/es/components/icon/assets/cloudStormy";
// import { icon as cloudSunny } from "@elastic/eui/es/components/icon/assets/cloudSunny";
// import { icon as cluster } from "@elastic/eui/es/components/icon/assets/cluster";
// import { icon as compute } from "@elastic/eui/es/components/icon/assets/compute";
// import { icon as console } from "@elastic/eui/es/components/icon/assets/console";
// import { icon as container } from "@elastic/eui/es/components/icon/assets/container";
// import { icon as continuityAbove } from "@elastic/eui/es/components/icon/assets/continuityAbove";
// import { icon as continuityAboveBelow } from "@elastic/eui/es/components/icon/assets/continuityAboveBelow";
// import { icon as continuityBelow } from "@elastic/eui/es/components/icon/assets/continuityBelow";
// import { icon as continuityWithin } from "@elastic/eui/es/components/icon/assets/continuityWithin";
// import { icon as copy } from "@elastic/eui/es/components/icon/assets/copy";
// import { icon as cross } from "@elastic/eui/es/components/icon/assets/cross";
// import { icon as crossInACircleFilled } from "@elastic/eui/es/components/icon/assets/crossInACircleFilled";
// import { icon as crosshairs } from "@elastic/eui/es/components/icon/assets/crosshairs";
// import { icon as currency } from "@elastic/eui/es/components/icon/assets/currency";
// import { icon as cut } from "@elastic/eui/es/components/icon/assets/cut";
// import { icon as database } from "@elastic/eui/es/components/icon/assets/database";
// import { icon as desktop } from "@elastic/eui/es/components/icon/assets/desktop";
// import { icon as documentEdit } from "@elastic/eui/es/components/icon/assets/documentEdit";
// import { icon as documentation } from "@elastic/eui/es/components/icon/assets/documentation";
// import { icon as documents } from "@elastic/eui/es/components/icon/assets/documents";
// import { icon as dot } from "@elastic/eui/es/components/icon/assets/dot";
// import { icon as doubleArrowLeft } from "@elastic/eui/es/components/icon/assets/doubleArrowLeft";
// import { icon as doubleArrowRight } from "@elastic/eui/es/components/icon/assets/doubleArrowRight";
// import { icon as download } from "@elastic/eui/es/components/icon/assets/download";
// import { icon as editorDistributeHorizontal } from "@elastic/eui/es/components/icon/assets/editorDistributeHorizontal";
// import { icon as editorDistributeVertical } from "@elastic/eui/es/components/icon/assets/editorDistributeVertical";
// import { icon as editorItemAlignBottom } from "@elastic/eui/es/components/icon/assets/editorItemAlignBottom";
// import { icon as editorItemAlignCenter } from "@elastic/eui/es/components/icon/assets/editorItemAlignCenter";
// import { icon as editorItemAlignLeft } from "@elastic/eui/es/components/icon/assets/editorItemAlignLeft";
// import { icon as editorItemAlignMiddle } from "@elastic/eui/es/components/icon/assets/editorItemAlignMiddle";
// import { icon as editorItemAlignRight } from "@elastic/eui/es/components/icon/assets/editorItemAlignRight";
// import { icon as editorItemAlignTop } from "@elastic/eui/es/components/icon/assets/editorItemAlignTop";
// import { icon as editorPositionBottomLeft } from "@elastic/eui/es/components/icon/assets/editorPositionBottomLeft";
// import { icon as editorPositionBottomRight } from "@elastic/eui/es/components/icon/assets/editorPositionBottomRight";
// import { icon as editorPositionTopLeft } from "@elastic/eui/es/components/icon/assets/editorPositionTopLeft";
// import { icon as editorPositionTopRight } from "@elastic/eui/es/components/icon/assets/editorPositionTopRight";
// import { icon as email } from "@elastic/eui/es/components/icon/assets/email";
// import { icon as empty } from "@elastic/eui/es/components/icon/assets/empty";
// import { icon as eql } from "@elastic/eui/es/components/icon/assets/eql";
// import { icon as eraser } from "@elastic/eui/es/components/icon/assets/eraser";
// import { icon as exit } from "@elastic/eui/es/components/icon/assets/exit";
// import { icon as expand } from "@elastic/eui/es/components/icon/assets/expand";
// import { icon as expandMini } from "@elastic/eui/es/components/icon/assets/expandMini";
// import { icon as eye } from "@elastic/eui/es/components/icon/assets/eye";
// import { icon as flag } from "@elastic/eui/es/components/icon/assets/flag";
// import { icon as fold } from "@elastic/eui/es/components/icon/assets/fold";
// import { icon as frameNext } from "@elastic/eui/es/components/icon/assets/frameNext";
// import { icon as framePrevious } from "@elastic/eui/es/components/icon/assets/framePrevious";
// import { icon as fullScreenExit } from "@elastic/eui/es/components/icon/assets/fullScreenExit";
// import { icon as gear } from "@elastic/eui/es/components/icon/assets/gear";
// import { icon as glasses } from "@elastic/eui/es/components/icon/assets/glasses";
// import { icon as globe } from "@elastic/eui/es/components/icon/assets/globe";
// import { icon as grab } from "@elastic/eui/es/components/icon/assets/grab";
// import { icon as heart } from "@elastic/eui/es/components/icon/assets/heart";
// import { icon as heatmap } from "@elastic/eui/es/components/icon/assets/heatmap";
// import { icon as help } from "@elastic/eui/es/components/icon/assets/help";
// import { icon as home } from "@elastic/eui/es/components/icon/assets/home";
// import { icon as iInCircle } from "@elastic/eui/es/components/icon/assets/iInCircle";
// import { icon as inputOutput } from "@elastic/eui/es/components/icon/assets/inputOutput";
// import { icon as inspect } from "@elastic/eui/es/components/icon/assets/inspect";
// import { icon as invert } from "@elastic/eui/es/components/icon/assets/invert";
// import { icon as ip } from "@elastic/eui/es/components/icon/assets/ip";
// import { icon as keyboard } from "@elastic/eui/es/components/icon/assets/keyboard";
// import { icon as kubernetesNode } from "@elastic/eui/es/components/icon/assets/kubernetesNode";
// import { icon as kubernetesPod } from "@elastic/eui/es/components/icon/assets/kubernetesPod";
// import { icon as layers } from "@elastic/eui/es/components/icon/assets/layers";
// import { icon as lettering } from "@elastic/eui/es/components/icon/assets/lettering";
// import { icon as lineDashed } from "@elastic/eui/es/components/icon/assets/lineDashed";
// import { icon as lineDotted } from "@elastic/eui/es/components/icon/assets/lineDotted";
// import { icon as lineSolid } from "@elastic/eui/es/components/icon/assets/lineSolid";
// import { icon as lock } from "@elastic/eui/es/components/icon/assets/lock";
// import { icon as lockOpen } from "@elastic/eui/es/components/icon/assets/lockOpen";
// import { icon as magnet } from "@elastic/eui/es/components/icon/assets/magnet";
// import { icon as magnifyWithExclamation } from "@elastic/eui/es/components/icon/assets/magnifyWithExclamation";
// import { icon as magnifyWithMinus } from "@elastic/eui/es/components/icon/assets/magnifyWithMinus";
// import { icon as magnifyWithPlus } from "@elastic/eui/es/components/icon/assets/magnifyWithPlus";
// import { icon as memory } from "@elastic/eui/es/components/icon/assets/memory";
// import { icon as menuDown } from "@elastic/eui/es/components/icon/assets/menuDown";
// import { icon as menuLeft } from "@elastic/eui/es/components/icon/assets/menuLeft";
// import { icon as menuRight } from "@elastic/eui/es/components/icon/assets/menuRight";
// import { icon as menuUp } from "@elastic/eui/es/components/icon/assets/menuUp";
// import { icon as merge } from "@elastic/eui/es/components/icon/assets/merge";
// import { icon as minimize } from "@elastic/eui/es/components/icon/assets/minimize";
// import { icon as minus } from "@elastic/eui/es/components/icon/assets/minus";
// import { icon as mobile } from "@elastic/eui/es/components/icon/assets/mobile";
// import { icon as moon } from "@elastic/eui/es/components/icon/assets/moon";
// import { icon as namespace } from "@elastic/eui/es/components/icon/assets/namespace";
// import { icon as nested } from "@elastic/eui/es/components/icon/assets/nested";
// import { icon as node } from "@elastic/eui/es/components/icon/assets/node";
// import { icon as offline } from "@elastic/eui/es/components/icon/assets/offline";
// import { icon as online } from "@elastic/eui/es/components/icon/assets/online";
// import { icon as pageSelect } from "@elastic/eui/es/components/icon/assets/pageSelect";
// import { icon as pagesSelect } from "@elastic/eui/es/components/icon/assets/pagesSelect";
// import { icon as partial } from "@elastic/eui/es/components/icon/assets/partial";
// import { icon as pause } from "@elastic/eui/es/components/icon/assets/pause";
// import { icon as payment } from "@elastic/eui/es/components/icon/assets/payment";
// import { icon as pencil } from "@elastic/eui/es/components/icon/assets/pencil";
// import { icon as percent } from "@elastic/eui/es/components/icon/assets/percent";
// import { icon as pin } from "@elastic/eui/es/components/icon/assets/pin";
// import { icon as play } from "@elastic/eui/es/components/icon/assets/play";
// import { icon as playFilled } from "@elastic/eui/es/components/icon/assets/playFilled";
// import { icon as plus } from "@elastic/eui/es/components/icon/assets/plus";
// import { icon as popout } from "@elastic/eui/es/components/icon/assets/popout";
// import { icon as push } from "@elastic/eui/es/components/icon/assets/push";
// import { icon as quote } from "@elastic/eui/es/components/icon/assets/quote";
// import { icon as refresh } from "@elastic/eui/es/components/icon/assets/refresh";
// import { icon as reporter } from "@elastic/eui/es/components/icon/assets/reporter";
// import { icon as save } from "@elastic/eui/es/components/icon/assets/save";
// import { icon as scale } from "@elastic/eui/es/components/icon/assets/scale";
// import { icon as securitySignal } from "@elastic/eui/es/components/icon/assets/securitySignal";
// import { icon as securitySignalDetected } from "@elastic/eui/es/components/icon/assets/securitySignalDetected";
// import { icon as securitySignalResolved } from "@elastic/eui/es/components/icon/assets/securitySignalResolved";
// import { icon as sessionViewer } from "@elastic/eui/es/components/icon/assets/sessionViewer";
// import { icon as shard } from "@elastic/eui/es/components/icon/assets/shard";
// import { icon as share } from "@elastic/eui/es/components/icon/assets/share";
// import { icon as snowflake } from "@elastic/eui/es/components/icon/assets/snowflake";
// import { icon as sortLeft } from "@elastic/eui/es/components/icon/assets/sortLeft";
// import { icon as sortRight } from "@elastic/eui/es/components/icon/assets/sortRight";
// import { icon as sortable } from "@elastic/eui/es/components/icon/assets/sortable";
// import { icon as starPlusEmpty } from "@elastic/eui/es/components/icon/assets/starPlusEmpty";
// import { icon as starPlusFilled } from "@elastic/eui/es/components/icon/assets/starPlusFilled";
// import { icon as stats } from "@elastic/eui/es/components/icon/assets/stats";
// import { icon as storage } from "@elastic/eui/es/components/icon/assets/storage";
// import { icon as submodule } from "@elastic/eui/es/components/icon/assets/submodule";
// import { icon as sun } from "@elastic/eui/es/components/icon/assets/sun";
// import { icon as symlink } from "@elastic/eui/es/components/icon/assets/symlink";
// import { icon as tableOfContents } from "@elastic/eui/es/components/icon/assets/tableOfContents";
// import { icon as tag } from "@elastic/eui/es/components/icon/assets/tag";
// import { icon as tear } from "@elastic/eui/es/components/icon/assets/tear";
// import { icon as timeline } from "@elastic/eui/es/components/icon/assets/timeline";
// import { icon as timeRefresh } from "@elastic/eui/es/components/icon/assets/timeRefresh";
// import { icon as timeslider } from "@elastic/eui/es/components/icon/assets/timeslider";
// import { icon as training } from "@elastic/eui/es/components/icon/assets/training";
// import { icon as trash } from "@elastic/eui/es/components/icon/assets/trash";
// import { icon as unfold } from "@elastic/eui/es/components/icon/assets/unfold";
// import { icon as unlink } from "@elastic/eui/es/components/icon/assets/unlink";
// import { icon as user } from "@elastic/eui/es/components/icon/assets/user";
// import { icon as userAvatar } from "@elastic/eui/es/components/icon/assets/userAvatar";
// import { icon as users } from "@elastic/eui/es/components/icon/assets/users";
// import { icon as vector } from "@elastic/eui/es/components/icon/assets/vector";
// import { icon as videoPlayer } from "@elastic/eui/es/components/icon/assets/videoPlayer";
// import { icon as wordWrap } from "@elastic/eui/es/components/icon/assets/wordWrap";
// import { icon as wordWrapDisabled } from "@elastic/eui/es/components/icon/assets/wordWrapDisabled";
// import { icon as wrench } from "@elastic/eui/es/components/icon/assets/wrench";
// import { icon as tokenClass } from "@elastic/eui/es/components/icon/assets/tokenClass";
// import { icon as tokenProperty } from "@elastic/eui/es/components/icon/assets/tokenProperty";
// import { icon as tokenEnum } from "@elastic/eui/es/components/icon/assets/tokenEnum";
// import { icon as tokenVariable } from "@elastic/eui/es/components/icon/assets/tokenVariable";
// import { icon as tokenMethod } from "@elastic/eui/es/components/icon/assets/tokenMethod";
// import { icon as tokenAnnotation } from "@elastic/eui/es/components/icon/assets/tokenAnnotation";
// import { icon as tokenException } from "@elastic/eui/es/components/icon/assets/tokenException";
// import { icon as tokenInterface } from "@elastic/eui/es/components/icon/assets/tokenInterface";
// import { icon as tokenParameter } from "@elastic/eui/es/components/icon/assets/tokenParameter";
// import { icon as tokenField } from "@elastic/eui/es/components/icon/assets/tokenField";
// import { icon as tokenElement } from "@elastic/eui/es/components/icon/assets/tokenElement";
// import { icon as tokenFunction } from "@elastic/eui/es/components/icon/assets/tokenFunction";
// import { icon as tokenBoolean } from "@elastic/eui/es/components/icon/assets/tokenBoolean";
// import { icon as tokenString } from "@elastic/eui/es/components/icon/assets/tokenString";
// import { icon as tokenArray } from "@elastic/eui/es/components/icon/assets/tokenArray";
// import { icon as tokenNumber } from "@elastic/eui/es/components/icon/assets/tokenNumber";
// import { icon as tokenConstant } from "@elastic/eui/es/components/icon/assets/tokenConstant";
// import { icon as tokenObject } from "@elastic/eui/es/components/icon/assets/tokenObject";
// import { icon as tokenEvent } from "@elastic/eui/es/components/icon/assets/tokenEvent";
// import { icon as tokenKey } from "@elastic/eui/es/components/icon/assets/tokenKey";
// import { icon as tokenNull } from "@elastic/eui/es/components/icon/assets/tokenNull";
// import { icon as tokenStruct } from "@elastic/eui/es/components/icon/assets/tokenStruct";
// import { icon as tokenPackage } from "@elastic/eui/es/components/icon/assets/tokenPackage";
// import { icon as tokenOperator } from "@elastic/eui/es/components/icon/assets/tokenOperator";
// import { icon as tokenEnumMember } from "@elastic/eui/es/components/icon/assets/tokenEnumMember";
// import { icon as tokenRepo } from "@elastic/eui/es/components/icon/assets/tokenRepo";
// import { icon as tokenSymbol } from "@elastic/eui/es/components/icon/assets/tokenSymbol";
// import { icon as tokenFile } from "@elastic/eui/es/components/icon/assets/tokenFile";
// import { icon as tokenModule } from "@elastic/eui/es/components/icon/assets/tokenModule";
// import { icon as tokenNamespace } from "@elastic/eui/es/components/icon/assets/tokenNamespace";
// import { icon as tokenDate } from "@elastic/eui/es/components/icon/assets/tokenDate";
// import { icon as tokenIP } from "@elastic/eui/es/components/icon/assets/tokenIP";
// import { icon as tokenNested } from "@elastic/eui/es/components/icon/assets/tokenNested";
// import { icon as tokenAlias } from "@elastic/eui/es/components/icon/assets/tokenAlias";
// import { icon as tokenShape } from "@elastic/eui/es/components/icon/assets/tokenShape";
// import { icon as tokenGeo } from "@elastic/eui/es/components/icon/assets/tokenGeo";
// import { icon as tokenRange } from "@elastic/eui/es/components/icon/assets/tokenRange";
// import { icon as tokenBinary } from "@elastic/eui/es/components/icon/assets/tokenBinary";
// import { icon as tokenJoin } from "@elastic/eui/es/components/icon/assets/tokenJoin";
// import { icon as tokenPercolator } from "@elastic/eui/es/components/icon/assets/tokenPercolator";
// import { icon as tokenFlattened } from "@elastic/eui/es/components/icon/assets/tokenFlattened";
// import { icon as tokenRankFeature } from "@elastic/eui/es/components/icon/assets/tokenRankFeature";
// import { icon as tokenRankFeatures } from "@elastic/eui/es/components/icon/assets/tokenRankFeatures";
// import { icon as tokenKeyword } from "@elastic/eui/es/components/icon/assets/tokenKeyword";
// import { icon as tokenTag } from "@elastic/eui/es/components/icon/assets/tokenTag";
// import { icon as tokenCompletionSuggester } from "@elastic/eui/es/components/icon/assets/tokenCompletionSuggester";
// import { icon as tokenDenseVector } from "@elastic/eui/es/components/icon/assets/tokenDenseVector";
// import { icon as tokenText } from "@elastic/eui/es/components/icon/assets/tokenText";
// import { icon as tokenTokenCount } from "@elastic/eui/es/components/icon/assets/tokenTokenCount";
// import { icon as tokenSearchType } from "@elastic/eui/es/components/icon/assets/tokenSearchType";
// import { icon as tokenHistogram } from "@elastic/eui/es/components/icon/assets/tokenHistogram";
// import { icon as addDataApp } from "@elastic/eui/es/components/icon/assets/app_add_data";
// import { icon as advancedSettingsApp } from "@elastic/eui/es/components/icon/assets/app_advanced_settings";
// import { icon as agentApp } from "@elastic/eui/es/components/icon/assets/app_fleet";
// import { icon as apmApp } from "@elastic/eui/es/components/icon/assets/app_apm";
// import { icon as apmTrace } from "@elastic/eui/es/components/icon/assets/apm_trace";
// import { icon as appSearchApp } from "@elastic/eui/es/components/icon/assets/app_app_search";
// import { icon as arrowDown } from "@elastic/eui/es/components/icon/assets/arrow_down";
// import { icon as arrowLeft } from "@elastic/eui/es/components/icon/assets/arrow_left";
// import { icon as arrowRight } from "@elastic/eui/es/components/icon/assets/arrow_right";
// import { icon as arrowUp } from "@elastic/eui/es/components/icon/assets/arrow_up";
// import { icon as auditbeatApp } from "@elastic/eui/es/components/icon/assets/app_auditbeat";
// import { icon as boxesHorizontal } from "@elastic/eui/es/components/icon/assets/boxes_horizontal";
// import { icon as boxesVertical } from "@elastic/eui/es/components/icon/assets/boxes_vertical";
// import { icon as canvasApp } from "@elastic/eui/es/components/icon/assets/app_canvas";
// import { icon as casesApp } from "@elastic/eui/es/components/icon/assets/app_cases";
// import { icon as classificationJob } from "@elastic/eui/es/components/icon/assets/ml_classification_job";
// import { icon as codeApp } from "@elastic/eui/es/components/icon/assets/app_code";
// import { icon as consoleApp } from "@elastic/eui/es/components/icon/assets/app_console";
// import { icon as controlsHorizontal } from "@elastic/eui/es/components/icon/assets/controls_horizontal";
// import { icon as controlsVertical } from "@elastic/eui/es/components/icon/assets/controls_vertical";
// import { icon as copyClipboard } from "@elastic/eui/es/components/icon/assets/copy_clipboard";
// import { icon as createAdvancedJob } from "@elastic/eui/es/components/icon/assets/ml_create_advanced_job";
// import { icon as createMultiMetricJob } from "@elastic/eui/es/components/icon/assets/ml_create_multi_metric_job";
// import { icon as createPopulationJob } from "@elastic/eui/es/components/icon/assets/ml_create_population_job";
// import { icon as createSingleMetricJob } from "@elastic/eui/es/components/icon/assets/ml_create_single_metric_job";
// import { icon as crossClusterReplicationApp } from "@elastic/eui/es/components/icon/assets/app_cross_cluster_replication";
// import { icon as dashboardApp } from "@elastic/eui/es/components/icon/assets/app_dashboard";
// import { icon as dataVisualizer } from "@elastic/eui/es/components/icon/assets/ml_data_visualizer";
// import { icon as devToolsApp } from "@elastic/eui/es/components/icon/assets/app_devtools";
// import { icon as discoverApp } from "@elastic/eui/es/components/icon/assets/app_discover";
// import { icon as editorAlignCenter } from "@elastic/eui/es/components/icon/assets/editor_align_center";
// import { icon as editorAlignLeft } from "@elastic/eui/es/components/icon/assets/editor_align_left";
// import { icon as editorAlignRight } from "@elastic/eui/es/components/icon/assets/editor_align_right";
// import { icon as editorBold } from "@elastic/eui/es/components/icon/assets/editor_bold";
// import { icon as editorChecklist } from "@elastic/eui/es/components/icon/assets/editor_checklist";
// import { icon as editorCodeBlock } from "@elastic/eui/es/components/icon/assets/editor_code_block";
// import { icon as editorComment } from "@elastic/eui/es/components/icon/assets/editor_comment";
// import { icon as editorHeading } from "@elastic/eui/es/components/icon/assets/editor_heading";
// import { icon as editorItalic } from "@elastic/eui/es/components/icon/assets/editor_italic";
// import { icon as editorLink } from "@elastic/eui/es/components/icon/assets/editor_link";
// import { icon as editorOrderedList } from "@elastic/eui/es/components/icon/assets/editor_ordered_list";
// import { icon as editorRedo } from "@elastic/eui/es/components/icon/assets/editor_redo";
// import { icon as editorStrike } from "@elastic/eui/es/components/icon/assets/editor_strike";
// import { icon as editorTable } from "@elastic/eui/es/components/icon/assets/editor_table";
// import { icon as editorUnderline } from "@elastic/eui/es/components/icon/assets/editor_underline";
// import { icon as editorUndo } from "@elastic/eui/es/components/icon/assets/editor_undo";
// import { icon as editorUnorderedList } from "@elastic/eui/es/components/icon/assets/editor_unordered_list";
// import { icon as emsApp } from "@elastic/eui/es/components/icon/assets/app_ems";
// import { icon as exportAction } from "@elastic/eui/es/components/icon/assets/export";
// import { icon as eyeClosed } from "@elastic/eui/es/components/icon/assets/eye_closed";
// import { icon as faceHappy } from "@elastic/eui/es/components/icon/assets/face_happy";
// import { icon as faceNeutral } from "@elastic/eui/es/components/icon/assets/face_neutral";
// import { icon as faceSad } from "@elastic/eui/es/components/icon/assets/face_sad";
// import { icon as filebeatApp } from "@elastic/eui/es/components/icon/assets/app_filebeat";
// import { icon as fleetApp } from "@elastic/eui/es/components/icon/assets/app_agent";
// import { icon as folderCheck } from "@elastic/eui/es/components/icon/assets/folder_check";
// import { icon as folderClosed } from "@elastic/eui/es/components/icon/assets/folder_closed";
// import { icon as folderExclamation } from "@elastic/eui/es/components/icon/assets/folder_exclamation";
// import { icon as folderOpen } from "@elastic/eui/es/components/icon/assets/folder_open";
// import { icon as fullScreen } from "@elastic/eui/es/components/icon/assets/full_screen";
// import { icon as gisApp } from "@elastic/eui/es/components/icon/assets/app_gis";
// import { icon as grabHorizontal } from "@elastic/eui/es/components/icon/assets/grab_horizontal";
// import { icon as graphApp } from "@elastic/eui/es/components/icon/assets/app_graph";
// import { icon as grokApp } from "@elastic/eui/es/components/icon/assets/app_grok";
// import { icon as heartbeatApp } from "@elastic/eui/es/components/icon/assets/app_heartbeat";
// import { icon as importAction } from "@elastic/eui/es/components/icon/assets/import";
// import { icon as indexClose } from "@elastic/eui/es/components/icon/assets/index_close";
// import { icon as indexEdit } from "@elastic/eui/es/components/icon/assets/index_edit";
// import { icon as indexFlush } from "@elastic/eui/es/components/icon/assets/index_flush";
// import { icon as indexManagementApp } from "@elastic/eui/es/components/icon/assets/app_index_management";
// import { icon as indexMapping } from "@elastic/eui/es/components/icon/assets/index_mapping";
// import { icon as indexOpen } from "@elastic/eui/es/components/icon/assets/index_open";
// import { icon as indexPatternApp } from "@elastic/eui/es/components/icon/assets/app_index_pattern";
// import { icon as indexRollupApp } from "@elastic/eui/es/components/icon/assets/app_index_rollup";
// import { icon as indexRuntime } from "@elastic/eui/es/components/icon/assets/index_runtime";
// import { icon as indexSettings } from "@elastic/eui/es/components/icon/assets/index_settings";
// import { icon as kqlField } from "@elastic/eui/es/components/icon/assets/kql_field";
// import { icon as kqlFunction } from "@elastic/eui/es/components/icon/assets/kql_function";
// import { icon as kqlOperand } from "@elastic/eui/es/components/icon/assets/kql_operand";
// import { icon as kqlSelector } from "@elastic/eui/es/components/icon/assets/kql_selector";
// import { icon as kqlValue } from "@elastic/eui/es/components/icon/assets/kql_value";
// import { icon as lensApp } from "@elastic/eui/es/components/icon/assets/app_lens";
// import { icon as listAdd } from "@elastic/eui/es/components/icon/assets/list_add";
// import { icon as logoAWS } from "@elastic/eui/es/components/icon/assets/logo_aws";
// import { icon as logoAWSMono } from "@elastic/eui/es/components/icon/assets/logo_aws_mono";
// import { icon as logoAerospike } from "@elastic/eui/es/components/icon/assets/logo_aerospike";
// import { icon as logoApache } from "@elastic/eui/es/components/icon/assets/logo_apache";
// import { icon as logoAppSearch } from "@elastic/eui/es/components/icon/assets/logo_app_search";
// import { icon as logoAzure } from "@elastic/eui/es/components/icon/assets/logo_azure";
// import { icon as logoAzureMono } from "@elastic/eui/es/components/icon/assets/logo_azure_mono";
// import { icon as logoBeats } from "@elastic/eui/es/components/icon/assets/logo_beats";
// import { icon as logoBusinessAnalytics } from "@elastic/eui/es/components/icon/assets/logo_business_analytics";
// import { icon as logoCeph } from "@elastic/eui/es/components/icon/assets/logo_ceph";
// import { icon as logoCloud } from "@elastic/eui/es/components/icon/assets/logo_cloud";
// import { icon as logoCloudEnterprise } from "@elastic/eui/es/components/icon/assets/logo_cloud_ece";
// import { icon as logoCode } from "@elastic/eui/es/components/icon/assets/logo_code";
// import { icon as logoCodesandbox } from "@elastic/eui/es/components/icon/assets/logo_codesandbox";
// import { icon as logoCouchbase } from "@elastic/eui/es/components/icon/assets/logo_couchbase";
// import { icon as logoDocker } from "@elastic/eui/es/components/icon/assets/logo_docker";
// import { icon as logoDropwizard } from "@elastic/eui/es/components/icon/assets/logo_dropwizard";
// import { icon as logoElastic } from "@elastic/eui/es/components/icon/assets/logo_elastic";
// import { icon as logoElasticStack } from "@elastic/eui/es/components/icon/assets/logo_elastic_stack";
// import { icon as logoElasticsearch } from "@elastic/eui/es/components/icon/assets/logo_elasticsearch";
// import { icon as logoEnterpriseSearch } from "@elastic/eui/es/components/icon/assets/logo_enterprise_search";
// import { icon as logoEtcd } from "@elastic/eui/es/components/icon/assets/logo_etcd";
// import { icon as logoGCP } from "@elastic/eui/es/components/icon/assets/logo_gcp";
// import { icon as logoGCPMono } from "@elastic/eui/es/components/icon/assets/logo_gcp_mono";
// import { icon as logoGithub } from "@elastic/eui/es/components/icon/assets/logo_github";
// import { icon as logoGmail } from "@elastic/eui/es/components/icon/assets/logo_gmail";
// import { icon as logoGolang } from "@elastic/eui/es/components/icon/assets/logo_golang";
// import { icon as logoGoogleG } from "@elastic/eui/es/components/icon/assets/logo_google_g";
// import { icon as logoHAproxy } from "@elastic/eui/es/components/icon/assets/logo_haproxy";
// import { icon as logoIBM } from "@elastic/eui/es/components/icon/assets/logo_ibm";
// import { icon as logoIBMMono } from "@elastic/eui/es/components/icon/assets/logo_ibm_mono";
// import { icon as logoKafka } from "@elastic/eui/es/components/icon/assets/logo_kafka";
// import { icon as logoKibana } from "@elastic/eui/es/components/icon/assets/logo_kibana";
// import { icon as logoKubernetes } from "@elastic/eui/es/components/icon/assets/logo_kubernetes";
// import { icon as logoLogging } from "@elastic/eui/es/components/icon/assets/logo_logging";
// import { icon as logoLogstash } from "@elastic/eui/es/components/icon/assets/logo_logstash";
// import { icon as logoMaps } from "@elastic/eui/es/components/icon/assets/logo_maps";
// import { icon as logoMemcached } from "@elastic/eui/es/components/icon/assets/logo_memcached";
// import { icon as logoMetrics } from "@elastic/eui/es/components/icon/assets/logo_metrics";
// import { icon as logoMongodb } from "@elastic/eui/es/components/icon/assets/logo_mongodb";
// import { icon as logoMySQL } from "@elastic/eui/es/components/icon/assets/logo_mysql";
// import { icon as logoNginx } from "@elastic/eui/es/components/icon/assets/logo_nginx";
// import { icon as logoObservability } from "@elastic/eui/es/components/icon/assets/logo_observability";
// import { icon as logoOsquery } from "@elastic/eui/es/components/icon/assets/logo_osquery";
// import { icon as logoPhp } from "@elastic/eui/es/components/icon/assets/logo_php";
// import { icon as logoPostgres } from "@elastic/eui/es/components/icon/assets/logo_postgres";
// import { icon as logoPrometheus } from "@elastic/eui/es/components/icon/assets/logo_prometheus";
// import { icon as logoRabbitmq } from "@elastic/eui/es/components/icon/assets/logo_rabbitmq";
// import { icon as logoRedis } from "@elastic/eui/es/components/icon/assets/logo_redis";
// import { icon as logoSecurity } from "@elastic/eui/es/components/icon/assets/logo_security";
// import { icon as logoSiteSearch } from "@elastic/eui/es/components/icon/assets/logo_site_search";
// import { icon as logoSketch } from "@elastic/eui/es/components/icon/assets/logo_sketch";
// import { icon as logoSlack } from "@elastic/eui/es/components/icon/assets/logo_slack";
// import { icon as logoUptime } from "@elastic/eui/es/components/icon/assets/logo_uptime";
// import { icon as logoWebhook } from "@elastic/eui/es/components/icon/assets/logo_webhook";
// import { icon as logoWindows } from "@elastic/eui/es/components/icon/assets/logo_windows";
// import { icon as logoWorkplaceSearch } from "@elastic/eui/es/components/icon/assets/logo_workplace_search";
// import { icon as logsApp } from "@elastic/eui/es/components/icon/assets/app_logs";
// import { icon as logstashFilter } from "@elastic/eui/es/components/icon/assets/logstash_filter";
// import { icon as logstashIf } from "@elastic/eui/es/components/icon/assets/logstash_if";
// import { icon as logstashInput } from "@elastic/eui/es/components/icon/assets/logstash_input";
// import { icon as logstashOutput } from "@elastic/eui/es/components/icon/assets/logstash_output";
// import { icon as logstashQueue } from "@elastic/eui/es/components/icon/assets/logstash_queue";
// import { icon as machineLearningApp } from "@elastic/eui/es/components/icon/assets/app_ml";
// import { icon as managementApp } from "@elastic/eui/es/components/icon/assets/app_management";
// import { icon as mapMarker } from "@elastic/eui/es/components/icon/assets/map_marker";
// import { icon as metricbeatApp } from "@elastic/eui/es/components/icon/assets/app_metricbeat";
// import { icon as metricsApp } from "@elastic/eui/es/components/icon/assets/app_metrics";
// import { icon as minusInCircle } from "@elastic/eui/es/components/icon/assets/minus_in_circle";
// import { icon as minusInCircleFilled } from "@elastic/eui/es/components/icon/assets/minus_in_circle_filled";
// import { icon as monitoringApp } from "@elastic/eui/es/components/icon/assets/app_monitoring";
// import { icon as notebookApp } from "@elastic/eui/es/components/icon/assets/app_notebook";
// import { icon as outlierDetectionJob } from "@elastic/eui/es/components/icon/assets/ml_outlier_detection_job";
// import { icon as packetbeatApp } from "@elastic/eui/es/components/icon/assets/app_packetbeat";
// import { icon as paperClip } from "@elastic/eui/es/components/icon/assets/paper_clip";
// import { icon as pinFilled } from "@elastic/eui/es/components/icon/assets/pin_filled";
// import { icon as pipelineApp } from "@elastic/eui/es/components/icon/assets/app_pipeline";
// import { icon as plusInCircle } from "@elastic/eui/es/components/icon/assets/plus_in_circle";
// import { icon as plusInCircleFilled } from "@elastic/eui/es/components/icon/assets/plus_in_circle_filled";
// import { icon as questionInCircle } from "@elastic/eui/es/components/icon/assets/question_in_circle";
// import { icon as recentlyViewedApp } from "@elastic/eui/es/components/icon/assets/app_recently_viewed";
// import { icon as regressionJob } from "@elastic/eui/es/components/icon/assets/ml_regression_job";
// import { icon as reportingApp } from "@elastic/eui/es/components/icon/assets/app_reporting";
// import { icon as returnKey } from "@elastic/eui/es/components/icon/assets/return_key";
// import { icon as savedObjectsApp } from "@elastic/eui/es/components/icon/assets/app_saved_objects";
// import { icon as searchProfilerApp } from "@elastic/eui/es/components/icon/assets/app_search_profiler";
// import { icon as securityAnalyticsApp } from "@elastic/eui/es/components/icon/assets/app_security_analytics";
// import { icon as securityApp } from "@elastic/eui/es/components/icon/assets/app_security";
// import { icon as sortDown } from "@elastic/eui/es/components/icon/assets/sort_down";
// import { icon as sortUp } from "@elastic/eui/es/components/icon/assets/sort_up";
// import { icon as spacesApp } from "@elastic/eui/es/components/icon/assets/app_spaces";
// import { icon as sqlApp } from "@elastic/eui/es/components/icon/assets/app_sql";
// import { icon as starEmpty } from "@elastic/eui/es/components/icon/assets/star_empty";
// import { icon as starEmptySpace } from "@elastic/eui/es/components/icon/assets/star_empty_space";
// import { icon as starFilled } from "@elastic/eui/es/components/icon/assets/star_filled";
// import { icon as starFilledSpace } from "@elastic/eui/es/components/icon/assets/star_filled_space";
// import { icon as starMinusEmpty } from "@elastic/eui/es/components/icon/assets/star_minus_empty";
// import { icon as starMinusFilled } from "@elastic/eui/es/components/icon/assets/star_minus_filled";
// import { icon as stopFilled } from "@elastic/eui/es/components/icon/assets/stop_filled";
// import { icon as stopSlash } from "@elastic/eui/es/components/icon/assets/stop_slash";
// import { icon as swatchInput } from "@elastic/eui/es/components/icon/assets/swatch_input";
// import { icon as tableDensityCompact } from "@elastic/eui/es/components/icon/assets/table_density_compact";
// import { icon as tableDensityExpanded } from "@elastic/eui/es/components/icon/assets/table_density_expanded";
// import { icon as tableDensityNormal } from "@elastic/eui/es/components/icon/assets/table_density_normal";
// import { icon as timelionApp } from "@elastic/eui/es/components/icon/assets/app_timelion";
// import { icon as upgradeAssistantApp } from "@elastic/eui/es/components/icon/assets/app_upgrade_assistant";
// import { icon as uptimeApp } from "@elastic/eui/es/components/icon/assets/app_uptime";
// import { icon as usersRolesApp } from "@elastic/eui/es/components/icon/assets/app_users_roles";
// import { icon as visArea } from "@elastic/eui/es/components/icon/assets/vis_area";
// import { icon as visAreaStacked } from "@elastic/eui/es/components/icon/assets/vis_area_stacked";
// import { icon as visBarHorizontal } from "@elastic/eui/es/components/icon/assets/vis_bar_horizontal";
// import { icon as visBarHorizontalStacked } from "@elastic/eui/es/components/icon/assets/vis_bar_horizontal_stacked";
// import { icon as visBarVertical } from "@elastic/eui/es/components/icon/assets/vis_bar_vertical";
// import { icon as visBarVerticalStacked } from "@elastic/eui/es/components/icon/assets/vis_bar_vertical_stacked";
// import { icon as visGauge } from "@elastic/eui/es/components/icon/assets/vis_gauge";
// import { icon as visGoal } from "@elastic/eui/es/components/icon/assets/vis_goal";
// import { icon as visLine } from "@elastic/eui/es/components/icon/assets/vis_line";
// import { icon as visMapCoordinate } from "@elastic/eui/es/components/icon/assets/vis_map_coordinate";
// import { icon as visMapRegion } from "@elastic/eui/es/components/icon/assets/vis_map_region";
// import { icon as visMetric } from "@elastic/eui/es/components/icon/assets/vis_metric";
// import { icon as visPie } from "@elastic/eui/es/components/icon/assets/vis_pie";
// import { icon as visTable } from "@elastic/eui/es/components/icon/assets/vis_table";
// import { icon as visTagCloud } from "@elastic/eui/es/components/icon/assets/vis_tag_cloud";
// import { icon as visText } from "@elastic/eui/es/components/icon/assets/vis_text";
// import { icon as visTimelion } from "@elastic/eui/es/components/icon/assets/vis_timelion";
// import { icon as visVega } from "@elastic/eui/es/components/icon/assets/vis_vega";
// import { icon as visVisualBuilder } from "@elastic/eui/es/components/icon/assets/vis_visual_builder";
// import { icon as visualizeApp } from "@elastic/eui/es/components/icon/assets/app_visualize";
// import { icon as watchesApp } from "@elastic/eui/es/components/icon/assets/app_watches";
// import { icon as workplaceSearchApp } from "@elastic/eui/es/components/icon/assets/app_workplace_search";

// type IconComponentNameType = ValuesType<typeof ICON_TYPES>;
// type IconComponentCacheType = Partial<Record<IconComponentNameType, unknown>>;

// const cachedIcons: IconComponentCacheType = {
//   string,
//   number,
//   link,
//   menu,
//   filter,
//   image,
//   stop,
//   alert,
//   document,
//   grid,
//   list,
//   search,
//   temperature,
//   color,
//   accessibility,
//   aggregate,
//   analyzeEvent,
//   annotation,
//   apps,
//   arrowStart,
//   arrowEnd,
//   asterisk,
//   beaker,
//   bell,
//   bellSlash,
//   bolt,
//   branch,
//   branchUser,
//   broom,
//   brush,
//   bug,
//   bullseye,
//   calendar,
//   check,
//   checkInCircleFilled,
//   cheer,
//   clock,
//   cloudDrizzle,
//   cloudStormy,
//   cloudSunny,
//   cluster,
//   compute,
//   console,
//   container,
//   continuityAbove,
//   continuityAboveBelow,
//   continuityBelow,
//   continuityWithin,
//   copy,
//   cross,
//   crossInACircleFilled,
//   crosshairs,
//   currency,
//   cut,
//   database,
//   desktop,
//   documentEdit,
//   documentation,
//   documents,
//   dot,
//   doubleArrowLeft,
//   doubleArrowRight,
//   download,
//   editorDistributeHorizontal,
//   editorDistributeVertical,
//   editorItemAlignBottom,
//   editorItemAlignCenter,
//   editorItemAlignLeft,
//   editorItemAlignMiddle,
//   editorItemAlignRight,
//   editorItemAlignTop,
//   editorPositionBottomLeft,
//   editorPositionBottomRight,
//   editorPositionTopLeft,
//   editorPositionTopRight,
//   email,
//   empty,
//   eql,
//   eraser,
//   exit,
//   expand,
//   expandMini,
//   eye,
//   flag,
//   fold,
//   frameNext,
//   framePrevious,
//   fullScreenExit,
//   gear,
//   glasses,
//   globe,
//   grab,
//   heart,
//   heatmap,
//   help,
//   home,
//   iInCircle,
//   inputOutput,
//   inspect,
//   invert,
//   ip,
//   keyboard,
//   kubernetesNode,
//   kubernetesPod,
//   layers,
//   lettering,
//   lineDashed,
//   lineDotted,
//   lineSolid,
//   lock,
//   lockOpen,
//   magnet,
//   magnifyWithExclamation,
//   magnifyWithMinus,
//   magnifyWithPlus,
//   memory,
//   menuDown,
//   menuLeft,
//   menuRight,
//   menuUp,
//   merge,
//   minimize,
//   minus,
//   mobile,
//   moon,
//   namespace,
//   nested,
//   node,
//   offline,
//   online,
//   pageSelect,
//   pagesSelect,
//   partial,
//   pause,
//   payment,
//   pencil,
//   percent,
//   pin,
//   play,
//   playFilled,
//   plus,
//   popout,
//   push,
//   quote,
//   refresh,
//   reporter,
//   save,
//   scale,
//   securitySignal,
//   securitySignalDetected,
//   securitySignalResolved,
//   sessionViewer,
//   shard,
//   share,
//   snowflake,
//   sortLeft,
//   sortRight,
//   sortable,
//   starPlusEmpty,
//   starPlusFilled,
//   stats,
//   storage,
//   submodule,
//   sun,
//   symlink,
//   tableOfContents,
//   tag,
//   tear,
//   timeline,
//   timeRefresh,
//   timeslider,
//   training,
//   trash,
//   unfold,
//   unlink,
//   user,
//   userAvatar,
//   users,
//   vector,
//   videoPlayer,
//   wordWrap,
//   wordWrapDisabled,
//   wrench,
//   tokenClass,
//   tokenProperty,
//   tokenEnum,
//   tokenVariable,
//   tokenMethod,
//   tokenAnnotation,
//   tokenException,
//   tokenInterface,
//   tokenParameter,
//   tokenField,
//   tokenElement,
//   tokenFunction,
//   tokenBoolean,
//   tokenString,
//   tokenArray,
//   tokenNumber,
//   tokenConstant,
//   tokenObject,
//   tokenEvent,
//   tokenKey,
//   tokenNull,
//   tokenStruct,
//   tokenPackage,
//   tokenOperator,
//   tokenEnumMember,
//   tokenRepo,
//   tokenSymbol,
//   tokenFile,
//   tokenModule,
//   tokenNamespace,
//   tokenDate,
//   tokenIP,
//   tokenNested,
//   tokenAlias,
//   tokenShape,
//   tokenGeo,
//   tokenRange,
//   tokenBinary,
//   tokenJoin,
//   tokenPercolator,
//   tokenFlattened,
//   tokenRankFeature,
//   tokenRankFeatures,
//   tokenKeyword,
//   tokenTag,
//   tokenCompletionSuggester,
//   tokenDenseVector,
//   tokenText,
//   tokenTokenCount,
//   tokenSearchType,
//   tokenHistogram,
//   addDataApp,
//   advancedSettingsApp,
//   agentApp,
//   apmApp,
//   apmTrace,
//   appSearchApp,
//   arrowDown,
//   arrowLeft,
//   arrowRight,
//   arrowUp,
//   auditbeatApp,
//   boxesHorizontal,
//   boxesVertical,
//   canvasApp,
//   casesApp,
//   classificationJob,
//   codeApp,
//   consoleApp,
//   controlsHorizontal,
//   controlsVertical,
//   copyClipboard,
//   createAdvancedJob,
//   createMultiMetricJob,
//   createPopulationJob,
//   createSingleMetricJob,
//   crossClusterReplicationApp,
//   dashboardApp,
//   dataVisualizer,
//   devToolsApp,
//   discoverApp,
//   editorAlignCenter,
//   editorAlignLeft,
//   editorAlignRight,
//   editorBold,
//   editorChecklist,
//   editorCodeBlock,
//   editorComment,
//   editorHeading,
//   editorItalic,
//   editorLink,
//   editorOrderedList,
//   editorRedo,
//   editorStrike,
//   editorTable,
//   editorUnderline,
//   editorUndo,
//   editorUnorderedList,
//   emsApp,
//   exportAction,
//   eyeClosed,
//   faceHappy,
//   faceNeutral,
//   faceSad,
//   filebeatApp,
//   fleetApp,
//   folderCheck,
//   folderClosed,
//   folderExclamation,
//   folderOpen,
//   fullScreen,
//   gisApp,
//   grabHorizontal,
//   graphApp,
//   grokApp,
//   heartbeatApp,
//   importAction,
//   indexClose,
//   indexEdit,
//   indexFlush,
//   indexManagementApp,
//   indexMapping,
//   indexOpen,
//   indexPatternApp,
//   indexRollupApp,
//   indexRuntime,
//   indexSettings,
//   kqlField,
//   kqlFunction,
//   kqlOperand,
//   kqlSelector,
//   kqlValue,
//   lensApp,
//   listAdd,
//   logoAWS,
//   logoAWSMono,
//   logoAerospike,
//   logoApache,
//   logoAppSearch,
//   logoAzure,
//   logoAzureMono,
//   logoBeats,
//   logoBusinessAnalytics,
//   logoCeph,
//   logoCloud,
//   logoCloudEnterprise,
//   logoCode,
//   logoCodesandbox,
//   logoCouchbase,
//   logoDocker,
//   logoDropwizard,
//   logoElastic,
//   logoElasticStack,
//   logoElasticsearch,
//   logoEnterpriseSearch,
//   logoEtcd,
//   logoGCP,
//   logoGCPMono,
//   logoGithub,
//   logoGmail,
//   logoGolang,
//   logoGoogleG,
//   logoHAproxy,
//   logoIBM,
//   logoIBMMono,
//   logoKafka,
//   logoKibana,
//   logoKubernetes,
//   logoLogging,
//   logoLogstash,
//   logoMaps,
//   logoMemcached,
//   logoMetrics,
//   logoMongodb,
//   logoMySQL,
//   logoNginx,
//   logoObservability,
//   logoOsquery,
//   logoPhp,
//   logoPostgres,
//   logoPrometheus,
//   logoRabbitmq,
//   logoRedis,
//   logoSecurity,
//   logoSiteSearch,
//   logoSketch,
//   logoSlack,
//   logoUptime,
//   logoWebhook,
//   logoWindows,
//   logoWorkplaceSearch,
//   logsApp,
//   logstashFilter,
//   logstashIf,
//   logstashInput,
//   logstashOutput,
//   logstashQueue,
//   machineLearningApp,
//   managementApp,
//   mapMarker,
//   metricbeatApp,
//   metricsApp,
//   minusInCircle,
//   minusInCircleFilled,
//   monitoringApp,
//   notebookApp,
//   outlierDetectionJob,
//   packetbeatApp,
//   paperClip,
//   pinFilled,
//   pipelineApp,
//   plusInCircle,
//   plusInCircleFilled,
//   questionInCircle,
//   recentlyViewedApp,
//   regressionJob,
//   reportingApp,
//   returnKey,
//   savedObjectsApp,
//   searchProfilerApp,
//   securityAnalyticsApp,
//   securityApp,
//   sortDown,
//   sortUp,
//   spacesApp,
//   sqlApp,
//   starEmpty,
//   starEmptySpace,
//   starFilled,
//   starFilledSpace,
//   starMinusEmpty,
//   starMinusFilled,
//   stopFilled,
//   stopSlash,
//   swatchInput,
//   tableDensityCompact,
//   tableDensityExpanded,
//   tableDensityNormal,
//   timelionApp,
//   upgradeAssistantApp,
//   uptimeApp,
//   usersRolesApp,
//   visArea,
//   visAreaStacked,
//   visBarHorizontal,
//   visBarHorizontalStacked,
//   visBarVertical,
//   visBarVerticalStacked,
//   visGauge,
//   visGoal,
//   visLine,
//   visMapCoordinate,
//   visMapRegion,
//   visMetric,
//   visPie,
//   visTable,
//   visTagCloud,
//   visText,
//   visTimelion,
//   visVega,
//   visVisualBuilder,
//   visualizeApp,
//   watchesApp,
//   workplaceSearchApp,
// };

// appendIconComponentCache(cachedIcons);
