import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";
import {
  Box,
  Button,
  Container,
  Divider,
  Skeleton,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { ActionsMenu } from "../components/actions-menu";
import { useMediaQuery } from "@mui/material";
import { getIconByName } from "../utils/icon-registry";
<<<<<<< HEAD
=======
import { useIsMobileLayout } from "../hooks/use-breakpoint";
import { useActionsDispatch } from "../hooks/use-actions-dispatch";
import { TabNavigationContext, useTabNavigationValue } from "./tab-navigation-context";
import { CippPageActionsFab } from "../components/CippComponents/CippPageActionsFab";
import { CippTabPicker } from "../components/CippComponents/CippTabPicker";
>>>>>>> parent of 754de69d1 (Merge pull request #366 from CyberDrain/dev)

export const HeaderedTabbedLayout = (props) => {
  const {
    children,
    tabOptions,
    title,
    subtitle,
    actions,
    actionsData,
    isFetching = false,
    backUrl,
  } = props;

  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const router = useRouter();
  const pathname = usePathname();
  const queryParams = router.query;
  const handleTabsChange = useCallback(
    (event, value) => {
      //if we have query params, we need to append them to the new path
      router.push(
        {
          pathname: value,
          query: queryParams,
        },
        undefined,
        { shallow: true }
      );
    },
    [router]
  );

<<<<<<< HEAD
  const currentTab = tabOptions.find((option) => option.path === pathname);
=======
  const handleTabsChange = useCallback((event, value) => navigateToTab(value), [navigateToTab]);

  const currentTab = tabOptions.find((option) => option.path === pathname);

  // Below md the tab row scrolls horizontally and still hides tabs off the right edge, so
  // navigation collapses to a picker in the title row — the one part of that row that is
  // empty at this width, since the Actions menu gets clipped here and moves to the FAB.
  const actionsDispatch = useActionsDispatch({ actions, data: actionsData, queryKeys });
  // No isFetching term: the desktop menu's equivalent `disabled` prop is swallowed by
  // ActionsMenu's unspread ...other, so including it here greyed out every action on mobile
  // during a background refetch while desktop left them clickable. Actions operate on
  // stale-but-present data quite happily; aligning down keeps the two surfaces identical
  // without changing desktop.
  const { visibleActions, isDisabled, dispatch } = actionsDispatch;
  const sheetActions = useMemo(
    () =>
      isMobile
        ? visibleActions.map((action) => ({
            label: action.label,
            icon: action.icon ? <SvgIcon fontSize="small">{action.icon}</SvgIcon> : null,
            disabled: isDisabled(action),
            onClick: () => dispatch(action),
          }))
        : [],
    [isMobile, visibleActions, isDisabled, dispatch]
  );

  const tabNavValue = useTabNavigationValue({
    tabs: tabOptions,
    currentPath: pathname,
    onNavigate: navigateToTab,
    actions: sheetActions,
    enabled: isMobile,
    providesGutters: true,
  });

  const subtitleBlock = isFetching ? (
    <Skeleton variant="text" width={200} />
  ) : (
    subtitle && (
      // useFlexGap: Stack's default spacing is a margin-left between children, which every
      // wrapped row inherits — that margin is why the icon/chip pairs sat indented from the
      // title above them. Gap applies to both axes, so the row gap is set separately or the
      // stacked pairs end up as far apart vertically as they are horizontally.
      <Stack
        alignItems="center"
        flexWrap="wrap"
        useFlexGap
        direction="row"
        sx={{ columnGap: 2, rowGap: 0.5, minWidth: 0 }}
      >
        {/* minWidth: 0 down the whole chain, and flexShrink: 0 on the icon. A copy-chip
            already carries MUI's ellipsis and maxWidth: 100%, but flex items default to
            min-width: auto, so every ancestor grew to fit instead of letting it truncate —
            which is how a guest UPN (user_domain.onmicrosoft.com#EXT#@tenant...) ran off the
            right edge of the screen. */}
        {subtitle.map((item, index) =>
          item.component ? (
            <Box key={index} sx={{ minWidth: 0, maxWidth: "100%" }}>
              {item.component}
            </Box>
          ) : (
            <Stack
              key={index}
              alignItems="center"
              direction="row"
              spacing={1}
              sx={{ minWidth: 0, maxWidth: "100%" }}
            >
              <SvgIcon fontSize="small" sx={{ flexShrink: 0 }}>
                {item.icon}
              </SvgIcon>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ minWidth: 0, "& .MuiChip-root": { maxWidth: "100%" } }}
              >
                {item.text}
              </Typography>
            </Stack>
          )
        )}
      </Stack>
    )
  );
>>>>>>> parent of 754de69d1 (Merge pull request #366 from CyberDrain/dev)

  return (
    <Box
      sx={{
        flexGrow: 1,
        pb: 4,
      }}
    >
      <Container maxWidth="xl" sx={{ height: "100%" }}>
        <Stack spacing={1} sx={{ height: "100%" }}>
          <Stack spacing={2}>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={1}
            >
              <Stack spacing={1}>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                >
                  <Typography variant={mdDown ? "h6" : "h4"}>{title}</Typography>
                </Stack>
                {isFetching ? (
                  <Skeleton variant="text" width={200} />
                ) : (
                  subtitle && (
                    <Stack alignItems="center" flexWrap="wrap" direction="row" spacing={2}>
                      {subtitle.map((item, index) =>
                        item.component ? (
                          <Box key={index}>{item.component}</Box>
                        ) : (
                          <Stack key={index} alignItems="center" direction="row" spacing={1}>
                            <SvgIcon fontSize="small">{item.icon}</SvgIcon>
                            <Typography color="text.secondary" variant="body2">
                              {item.text}
                            </Typography>
                          </Stack>
                        )
                      )}
                    </Stack>
                  )
                )}
              </Stack>
<<<<<<< HEAD
              {actions && actions.length > 0 && (
                <ActionsMenu actions={actions} data={actionsData} disabled={isFetching} />
=======
              {!isMobile && (
                <div>
                  <Tabs
                    onChange={handleTabsChange}
                    value={currentTab?.path}
                    variant="scrollable"
                    sx={{
                      "& .MuiTab-root:first-of-type": {
                        ml: 2,
                      },
                    }}
                  >
                    {tabOptions.map((option) => {
                      const icon = getIconByName(option.icon, { fontSize: "small" });
                      const iconPosition = option.iconPosition ?? "start";
                      const compactIcon = icon && ["end", "start"].includes(iconPosition);

                      return (
                        <Tab
                          key={option.path}
                          label={option.label}
                          value={option.path}
                          icon={icon ?? undefined}
                          iconPosition={icon ? iconPosition : undefined}
                          sx={compactIcon ? { minHeight: 48, py: 1.5 } : undefined}
                        />
                      );
                    })}
                  </Tabs>
                  <Divider />
                </div>
>>>>>>> parent of 754de69d1 (Merge pull request #366 from CyberDrain/dev)
              )}
            </Stack>
            <div>
              <Tabs
                onChange={handleTabsChange}
                value={currentTab?.path}
                variant="scrollable"
                sx={{
                  "& .MuiTab-root:first-of-type": {
                    ml: 2,
                  },
                }}
              >
                {tabOptions.map((option) => {
                  const icon = getIconByName(option.icon, { fontSize: "small" });
                  const iconPosition = option.iconPosition ?? "start";
                  const compactIcon = icon && ["end", "start"].includes(iconPosition);

                  return (
                    <Tab
                      key={option.path}
                      label={option.label}
                      value={option.path}
                      icon={icon ?? undefined}
                      iconPosition={icon ? iconPosition : undefined}
                      sx={compactIcon ? { minHeight: 48, py: 1.5 } : undefined}
                    />
                  );
                })}
              </Tabs>
              <Divider />
            </div>
          </Stack>
          <Box
            sx={
              !mdDown && {
                flexGrow: 1,
                overflow: "auto",
                height: "calc(100vh - 350px)",
              }
            }
          >
            {children}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

HeaderedTabbedLayout.propTypes = {
  children: PropTypes.node,
  tabOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.string,
      iconPosition: PropTypes.oneOf(["bottom", "end", "start", "top"]),
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      handler: PropTypes.func.isRequired,
    })
  ),
  isFetching: PropTypes.bool,
};
