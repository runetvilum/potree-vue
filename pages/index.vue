<template>
  <v-app>
    <v-main>
      <v-row>
        <v-col>
          <div ref="potree" style="height: 100vh; width: 100%" />
        </v-col>
        <v-col>
          <div id="profile_window" style="height: 100vh; width: 100%">
            <div
              id="profile_titlebar"
              class="pv-titlebar"
              style="
                display: flex;
                position: absolute;
                height: 30px;
                width: 100%;
                box-sizing: border-box;
              "
            >
              <span style="padding-right: 10px">
                <span
                  id="profile_window_title"
                  data-i18n="profile.title"
                ></span>
              </span>
              <span id="profileInfo" style="flex-grow: 1; flex-direction: row">
              </span>
              <!-- <span id="profile_toggle_size_button" class="ui-icon ui-icon-newwin profile-button"> </span> -->
              <!--<span id="closeProfileContainer" class="ui-icon ui-icon-close profile-button"> </span>-->
              <img
                id="closeProfileContainer"
                class="button-icon"
                style="width: 24px; height: 24px; margin: 4px"
              />
            </div>

            <div
              style="
                position: absolute;
                top: 30px;
                width: 100%;
                height: calc(100% - 30px);
                box-sizing: border-box;
              "
              class="pw_content"
            >
              <span
                class="pv-main-color"
                style="
                  height: 100%;
                  width: 100%;
                  padding: 5px;
                  display: flex;
                  flex-direction: column;
                  box-sizing: border-box;
                "
              >
                <div
                  style="
                    width: 100%;
                    color: #9d9d9d;
                    margin: 5px;
                    display: flex;
                    flex-direction: row;
                    box-sizing: border-box;
                  "
                >
                  <span data-i18n="profile.nb_points"></span>: &nbsp;
                  <span id="profile_num_points">-</span>
                  <!--<span id="profile_threshold" style="width: 300px">
					Threshold: <span id="potree_profile_threshold_label">123</span> <div id="potree_profile_threshold_slider"></div>
				</span>-->
                  <span style="flex-grow: 1"></span>
                  <span>
                    <!-- <span contenteditable="true" style="display: inline-block; 
						width: 24px; height: 24px; 
						vertical-align: top; 
						background: white; color:black"></span> -->

                    <input
                      id="potree_profile_rotate_amount"
                      type="text"
                      maxlength="4"
                      value="10"
                      style="
                        display: inline-block;
                        width: 2.5em;
                        vertical-align: top;
                        background: white;
                        margin: 2px;
                      "
                  /></span>

                  <img id="potree_profile_rotate_cw" class="text-icon" />
                  <img id="potree_profile_rotate_ccw" class="text-icon" />

                  <img id="potree_profile_move_forward" class="text-icon" />
                  <img id="potree_profile_move_backward" class="text-icon" />

                  <a
                    id="potree_download_profile_ortho_link"
                    href="#"
                    download="profile.csv"
                  >
                    <img id="potree_download_csv_icon" class="text-icon" />
                  </a>

                  <a
                    id="potree_download_profile_link"
                    href="#"
                    download="profile.las"
                  >
                    <img id="potree_download_las_icon" class="text-icon" />
                  </a>
                </div>

                <div
                  id="profile_draw_container"
                  style="
                    width: 100%;
                    flex-grow: 1;
                    position: relative;
                    height: 100%;
                    box-sizing: border-box;
                    user-select: none;
                  "
                >
                  <div
                    style="
                      position: absolute;
                      left: 41px;
                      top: 0;
                      bottom: 20;
                      width: calc(100% - 41px);
                      height: calc(100% - 20px);
                      background-color: #000000;
                    "
                  ></div>
                  <svg
                    id="profileSVG"
                    style="
                      fill: #9d9d9d;
                      position: absolute;
                      left: 0;
                      right: 0;
                      top: 0;
                      bottom: 0;
                      width: 100%;
                      height: 100%;
                    "
                  ></svg>
                  <div
                    id="profileCanvasContainer"
                    style="
                      position: absolute;
                      left: 41px;
                      top: 0;
                      bottom: 20;
                      width: calc(100% - 41px);
                      height: calc(100% - 20px);
                      /*background-color: #000000;*/
                    "
                  ></div>

                  <div
                    id="profileSelectionProperties"
                    style="
                      position: absolute;
                      left: 50px;
                      top: 10px;
                      background-color: black;
                      color: white;
                      opacity: 0.7;
                      padding: 5px;
                      border: 1px solid white;
                      user-select: text;
                    "
                  >
                    position: asdsadf asdf<br />
                    rgb: 123 423 123
                  </div>
                </div>
              </span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
// import * as Potree from 'potree/build/potree/potree'
// import { ProfileWindow, ProfileWindowController } from '~/plugins/profile4'
/*
import {
  ProfileWindow,
  ProfileWindowController,
} from 'potree/src/viewer/profile'
*/
export default {
  head() {
    return {}
  },
  mounted() {
    /* eslint no-import-assign: 0 */
    // Potree.scriptPath = window.location.origin
    // Potree.resourcePath = `${Potree.scriptPath}/resources`
    const Potree = window.Potree
    const viewer = new Potree.Viewer(this.$refs.potree)
    viewer.setEDLEnabled(false)
    viewer.setFOV(60)
    viewer.setPointBudget(1_000_000)
    viewer.loadSettingsFromURL()
    viewer.setBackground('skybox')
    viewer.profileWindow = new Potree.ProfileWindow(viewer)
    viewer.profileWindowController = new Potree.ProfileWindowController(viewer)
    Potree.loadPointCloud(
      'https://tilecloud1.geonote.dk/824c6aec-d8ff-4955-ad86-9dc24820de48/b4e633a3-2f66-4d41-8330-249992a7bef4/cloud.js',
      'sigeom.sa',
      (e) => {
        const scene = viewer.scene
        const pointcloud = e.pointcloud
        pointcloud.material.activeAttributeName = 'elevation'
        const material = pointcloud.material
        material.size = 1
        material.pointSizeType = Potree.PointSizeType.ADAPTIVE
        material.shape = Potree.PointShape.SQUARE

        scene.addPointCloud(pointcloud)

        viewer.fitToScreen()
        setTimeout(() => {
          const profile = viewer.profileTool.startInsertion()
          viewer.profileWindowController.setProfile(profile)
        }, 1000)

        // scene.view.setView(
        // 	[589974.341, 231698.397, 986.146],
        // 	[589851.587, 231428.213, 715.634],
        // );
      }
    )
  },
}
</script>
